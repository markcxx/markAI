/* eslint-disable sort-keys-fix/sort-keys-fix, typescript-sort-keys/interface */
import { ModelProvider } from '@/libs/model-runtime/types/type';
import {
  ModelParamsSchema,
  RuntimeImageGenParams,
  extractDefaultValues,
} from '@/libs/standard-parameters/index';

export const DEFAULT_AI_IMAGE_PROVIDER = ModelProvider.ModelScope;
export const DEFAULT_AI_IMAGE_MODEL = 'Qwen/Qwen-Image';
export const DEFAULT_IMAGE_NUM = 1;

// 默认的图片生成参数schema，使用aspectRatio而不是size
export const defaultImageParamsSchema: ModelParamsSchema = {
  aspectRatio: {
    default: '1:1',
    enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
  },
  prompt: {
    default: '',
  },
};

export interface GenerationConfigState {
  parameters: RuntimeImageGenParams;
  parametersSchema: ModelParamsSchema;

  provider: string;
  model: string;
  imageNum: number;

  isAspectRatioLocked: boolean;
  activeAspectRatio: string | null; // string - 虚拟比例; null - 原生比例

  // 提示词增强相关
  promptEnhancement: {
    enabled: boolean;
    model: string;
    provider: string;
  };
}

export const DEFAULT_IMAGE_GENERATION_PARAMETERS: RuntimeImageGenParams =
  extractDefaultValues(defaultImageParamsSchema);

export const initialGenerationConfigState: GenerationConfigState = {
  model: DEFAULT_AI_IMAGE_MODEL,
  provider: DEFAULT_AI_IMAGE_PROVIDER,
  imageNum: DEFAULT_IMAGE_NUM,
  parameters: DEFAULT_IMAGE_GENERATION_PARAMETERS,
  parametersSchema: defaultImageParamsSchema,
  isAspectRatioLocked: false,
  activeAspectRatio: null,
  promptEnhancement: {
    enabled: false,
    model: 'gemini-2.5-flash',
    provider: 'google',
  },
};
