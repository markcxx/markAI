import { RuntimeImageGenParamsKeys } from '@/libs/standard-parameters/index';

import { GenerationConfigState } from './initialState';

export const model = (s: GenerationConfigState) => s.model;
export const provider = (s: GenerationConfigState) => s.provider;
export const imageNum = (s: GenerationConfigState) => s.imageNum;

// 提示词增强相关
export const promptEnhancement = (s: GenerationConfigState) => s.promptEnhancement;
export const promptEnhancementEnabled = (s: GenerationConfigState) =>
  s.promptEnhancement?.enabled || false;
export const promptEnhancementModel = (s: GenerationConfigState) =>
  s.promptEnhancement?.model || 'gemini-2.5-flash';
export const promptEnhancementProvider = (s: GenerationConfigState) =>
  s.promptEnhancement?.provider || 'google';

const parameters = (s: GenerationConfigState) => s.parameters;
const parametersSchema = (s: GenerationConfigState) => s.parametersSchema;
const isSupportedParam = (paramName: RuntimeImageGenParamsKeys) => {
  return (s: GenerationConfigState) => {
    const _parametersSchema = parametersSchema(s);
    return Boolean(paramName in _parametersSchema);
  };
};

export const imageGenerationConfigSelectors = {
  model,
  provider,
  imageNum,
  isSupportedParam,
  parameters,
  parametersSchema,
  promptEnhancement,
  promptEnhancementEnabled,
  promptEnhancementModel,
  promptEnhancementProvider,
};
