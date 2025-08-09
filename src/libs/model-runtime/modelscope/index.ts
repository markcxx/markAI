import type { ChatModelCard } from '@/types/llm';

import { ModelProvider } from '../types';
import { CreateImagePayload, CreateImageResponse } from '../types/image';
import { AgentRuntimeError } from '../utils/createError';
import { createOpenAICompatibleRuntime } from '../utils/openaiCompatibleFactory';

export interface ModelScopeModelCard {
  created: number;
  id: string;
  object: string;
  owned_by: string;
}

const createModelScopeImage = async (
  payload: CreateImagePayload,
  options: { apiKey: string },
): Promise<CreateImageResponse> => {
  const { model, params } = payload;
  const endpoint = 'https://api-inference.modelscope.cn/v1/images/generations';

  try {
    const response = await fetch(endpoint, {
      body: JSON.stringify({
        model,
        n: 1,
        prompt: params.prompt,
        size: params.size || '1024x1024',
        ...(params.seed !== undefined ? { seed: params.seed } : {}),
      }),
      headers: {
        'Authorization': `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate image');
    }

    const result = await response.json();
    if (!result.images?.[0]?.url) {
      throw new Error('No image URL in response');
    }

    return {
      imageUrl: result.images[0].url,
    };
  } catch (error) {
    const err = error as Error;
    throw AgentRuntimeError.createImage({
      error: { message: err.message },
      errorType: 'ProviderBizError',
      provider: ModelProvider.ModelScope,
    });
  }
};

export const LobeModelScopeAI = createOpenAICompatibleRuntime({
  baseURL: 'https://api-inference.modelscope.cn/v1',
  createImage: createModelScopeImage,
  debug: {
    chatCompletion: () => process.env.DEBUG_MODELSCOPE_CHAT_COMPLETION === '1',
  },
  models: async ({ client }) => {
    const { LOBE_DEFAULT_MODEL_LIST } = await import('@/config/aiModels');

    const functionCallKeywords = ['qwen', 'deepseek', 'llama'];

    const visionKeywords = ['qwen-vl', 'qwen2-vl', 'llava'];

    const reasoningKeywords = ['qwq', 'deepseek-r1'];

    try {
      const modelsPage = (await client.models.list()) as any;
      const modelList: ModelScopeModelCard[] = modelsPage.data || [];

      return modelList
        .map((model) => {
          const knownModel = LOBE_DEFAULT_MODEL_LIST.find(
            (m) => model.id.toLowerCase() === m.id.toLowerCase(),
          );

          const modelId = model.id.toLowerCase();

          return {
            contextWindowTokens: knownModel?.contextWindowTokens ?? undefined,
            displayName: knownModel?.displayName ?? model.id,
            enabled: knownModel?.enabled || false,
            functionCall:
              functionCallKeywords.some((keyword) => modelId.includes(keyword)) ||
              knownModel?.abilities?.functionCall ||
              false,
            id: model.id,
            reasoning:
              reasoningKeywords.some((keyword) => modelId.includes(keyword)) ||
              knownModel?.abilities?.reasoning ||
              false,
            vision:
              visionKeywords.some((keyword) => modelId.includes(keyword)) ||
              knownModel?.abilities?.vision ||
              false,
          };
        })
        .filter(Boolean) as ChatModelCard[];
    } catch (error) {
      console.warn(
        'Failed to fetch ModelScope models. Please ensure your ModelScope API key is valid and your Alibaba Cloud account is properly bound:',
        error,
      );
      return [];
    }
  },
  provider: ModelProvider.ModelScope,
});
