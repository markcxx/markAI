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

/**
 * Create an image generation task with ModelScope API
 */
async function createImageTask(payload: CreateImagePayload, apiKey: string): Promise<string> {
  const { model, params } = payload;
  const endpoint = 'https://api-inference.modelscope.cn/v1/images/generations';

  const response = await fetch(endpoint, {
    body: JSON.stringify({
      model,
      prompt: params.prompt,
      ...(params.seed !== undefined ? { seed: params.seed } : {}),
    }),
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-ModelScope-Async-Mode': 'true',
    },
    method: 'POST',
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // Failed to parse JSON error response
    }
    throw new Error(
      `Failed to create image task (${response.status}): ${errorData?.error?.message || response.statusText}`,
    );
  }

  const result = await response.json();
  if (!result.task_id) {
    throw new Error('No task_id in response');
  }

  return result.task_id;
}

/**
 * Query the status of an image generation task
 */
async function queryTaskStatus(taskId: string, apiKey: string): Promise<any> {
  const endpoint = `https://api-inference.modelscope.cn/v1/tasks/${taskId}`;

  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-ModelScope-Task-Type': 'image_generation',
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // Failed to parse JSON error response
    }
    throw new Error(
      `Failed to query task status (${response.status}): ${errorData?.error?.message || response.statusText}`,
    );
  }

  return response.json();
}

const createModelScopeImage = async (
  payload: CreateImagePayload,
  options: { apiKey: string },
): Promise<CreateImageResponse> => {
  // ModelScope has changed all image generation models to async mode
  // Use async mode for all models
  try {
    // 1. Create image generation task
    const taskId = await createImageTask(payload, options.apiKey);

    // 2. Poll task status until completion
    let taskStatus: any = null;
    let retries = 0;
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 3;
    const maxRetries = 60; // Maximum 5 minutes with 5s intervals
    const retryInterval = 5000; // 5 seconds

    while (retries < maxRetries) {
      try {
        taskStatus = await queryTaskStatus(taskId, options.apiKey);
        consecutiveFailures = 0; // Reset consecutive failures on success
      } catch {
        consecutiveFailures++;
        if (consecutiveFailures >= maxConsecutiveFailures) {
          throw new Error(
            `Failed to query task status after ${maxConsecutiveFailures} consecutive attempts`,
          );
        }
        // Continue to retry after a delay
      }

      if (taskStatus?.task_status === 'SUCCEED') {
        if (!taskStatus.output_images?.[0]) {
          throw new Error('No image URL in successful response');
        }
        return {
          imageUrl: taskStatus.output_images[0],
        };
      } else if (taskStatus?.task_status === 'FAILED') {
        throw new Error('Image generation task failed');
      }

      // Wait before next retry
      await new Promise((resolve) => {
        setTimeout(resolve, retryInterval);
      });
      retries++;
    }

    throw new Error('Image generation task timed out');
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
