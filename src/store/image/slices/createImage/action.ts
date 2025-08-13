import { StateCreator } from 'zustand';

import { chainPromptEnhancement } from '@/chains/promptEnhancement';
import { chatService } from '@/services/chat';
import { imageService } from '@/services/image';

import { ImageStore } from '../../store';
import { generationBatchSelectors } from '../generationBatch/selectors';
import { imageGenerationConfigSelectors } from '../generationConfig/selectors';
import { generationTopicSelectors } from '../generationTopic';

// ====== action interface ====== //

export interface CreateImageAction {
  createImage: () => Promise<void>;
  /**
   * eg: invalid api key, recreate image
   */
  recreateImage: (generationBatchId: string) => Promise<void>;
}

// ====== helper functions ====== //

// ====== action implementation ====== //

export const createCreateImageSlice: StateCreator<
  ImageStore,
  [['zustand/devtools', never]],
  [],
  CreateImageAction
> = (set, get) => ({
  async createImage() {
    set({ isCreating: true }, false, 'createImage/startCreateImage');

    const store = get();
    const imageNum = imageGenerationConfigSelectors.imageNum(store);
    const parameters = imageGenerationConfigSelectors.parameters(store);
    const provider = imageGenerationConfigSelectors.provider(store);
    const model = imageGenerationConfigSelectors.model(store);
    const activeGenerationTopicId = generationTopicSelectors.activeGenerationTopicId(store);
    const { createGenerationTopic, switchGenerationTopic, setTopicBatchLoaded } = store;

    if (!parameters) {
      throw new TypeError('parameters is not initialized');
    }

    if (!parameters.prompt) {
      throw new TypeError('prompt is empty');
    }

    // Check if prompt enhancement is enabled
    const promptEnhancementEnabled = imageGenerationConfigSelectors.promptEnhancementEnabled(store);
    const promptEnhancementModel = imageGenerationConfigSelectors.promptEnhancementModel(store);
    const promptEnhancementProvider =
      imageGenerationConfigSelectors.promptEnhancementProvider(store);

    let finalPrompt = parameters.prompt;

    // Enhance prompt if enabled
    if (promptEnhancementEnabled && promptEnhancementModel && promptEnhancementProvider) {
      try {
        const enhancementPayload = chainPromptEnhancement(parameters.prompt);

        // 转换 OpenAIChatMessage[] 为 ChatMessage[]
        const messages =
          enhancementPayload.messages?.map((msg, index) => ({
            id: `enhancement_${index}`,
            content: typeof msg.content === 'string' ? msg.content : '',
            role: msg.role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            meta: {},
          })) || [];

        // 使用 Promise 包装回调方式的 API
        const enhancedPrompt = await new Promise<string>((resolve, reject) => {
          let assistantContent = '';

          chatService.createAssistantMessage(
            {
              ...enhancementPayload,
              messages,
              model: promptEnhancementModel,
              provider: promptEnhancementProvider,
            },
            {
              onMessageHandle: (message) => {
                if (message.type === 'text') {
                  assistantContent += message.text;
                }
              },
              onFinish: async () => {
                resolve(assistantContent.trim() || parameters.prompt);
              },
              onErrorHandle: (error) => {
                reject(error);
              },
            },
          );
        });

        if (enhancedPrompt && enhancedPrompt !== parameters.prompt) {
          finalPrompt = enhancedPrompt;
        }
      } catch (error) {
        console.warn('提示词增强失败，使用原始提示词:', error);
        // Continue with original prompt if enhancement fails
      }
    }

    // Update parameters with enhanced prompt
    const enhancedParameters = {
      ...parameters,
      prompt: finalPrompt,
    };

    // Track the final topic ID to use for image creation
    let finalTopicId = activeGenerationTopicId;

    // 1. Create generation topic if not exists
    let generationTopicId = activeGenerationTopicId;
    let isNewTopic = false;

    if (!generationTopicId) {
      isNewTopic = true;
      const prompts = [parameters.prompt];
      const newGenerationTopicId = await createGenerationTopic(prompts);
      finalTopicId = newGenerationTopicId;

      // 2. Initialize empty batch array to avoid skeleton screen
      setTopicBatchLoaded(newGenerationTopicId);

      // 3. Switch to the new topic (now it has empty data, so no skeleton screen)
      switchGenerationTopic(newGenerationTopicId);
    }

    try {
      // 4. If it's a new topic, set the creating state after topic creation
      if (isNewTopic) {
        set({ isCreatingWithNewTopic: true }, false, 'createImage/startCreateImageWithNewTopic');
      }

      // 5. Create image via service
      await imageService.createImage({
        generationTopicId: finalTopicId!,
        provider,
        model,
        imageNum,
        params: enhancedParameters as any,
      });

      // 6. Only refresh generation batches if it's not a new topic
      if (!isNewTopic) {
        await get().refreshGenerationBatches();
      }
    } finally {
      // 7. Reset all creating states
      if (isNewTopic) {
        set(
          { isCreating: false, isCreatingWithNewTopic: false },
          false,
          'createImage/endCreateImageWithNewTopic',
        );
      } else {
        set({ isCreating: false }, false, 'createImage/endCreateImage');
      }
    }
  },

  async recreateImage(generationBatchId: string) {
    set({ isCreating: true }, false, 'recreateImage/startCreateImage');

    const store = get();
    const imageNum = imageGenerationConfigSelectors.imageNum(store);
    const activeGenerationTopicId = generationTopicSelectors.activeGenerationTopicId(store);
    const batch = generationBatchSelectors.getGenerationBatchByBatchId(generationBatchId)(store)!;
    const { removeGenerationBatch } = store;

    if (!activeGenerationTopicId) {
      throw new Error('No active generation topic');
    }

    try {
      // 1. Delete generation batch
      await removeGenerationBatch(generationBatchId, activeGenerationTopicId);

      // 2. Create image via service
      await imageService.createImage({
        generationTopicId: activeGenerationTopicId,
        provider: batch.provider,
        model: batch.model,
        imageNum,
        params: batch.config as any,
      });

      // 3. Refresh generation batches to show the real data
      await store.refreshGenerationBatches();
    } finally {
      set({ isCreating: false }, false, 'recreateImage/endCreateImage');
    }
  },
});
