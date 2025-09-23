import { ModelProviderCard } from '@/types/llm';

const MarkAI: ModelProviderCard = {
  chatModels: [
    {
      contextWindowTokens: 128_000,
      description: 'DeepSeek-V3.1 是 DeepSeek 最新的大型语言模型，具有强大的推理和代码生成能力',
      displayName: 'DeepSeek-V3.1',
      enabled: true,
      id: 'deepseek-ai/DeepSeek-V3.1:fireworks-ai',
    },
    {
      contextWindowTokens: 128_000,
      description: 'GPT OSS 120B 是一个开源的大型语言模型，提供强大的对话和文本生成能力',
      displayName: 'GPT OSS 120B',
      enabled: true,
      id: 'openai/gpt-oss-120b:fireworks-ai',
    },
    {
      contextWindowTokens: 128_000,
      description: 'GLM-4.5 是智谱AI开发的多模态大型语言模型，支持文本理解和生成',
      displayName: 'GLM-4.5',
      enabled: true,
      id: 'zai-org/GLM-4.5:fireworks-ai',
    },
  ],
  checkModel: 'deepseek-ai/DeepSeek-V3.1:fireworks-ai',
  description:
    'MarkAI 是基于 HuggingFace API 的二次封装服务，提供高质量的AI模型访问能力。支持多种先进的开源模型，为开发者提供稳定可靠的AI服务。',
  disableBrowserRequest: true,
  id: 'markai',
  modelList: { showModelFetcher: true },
  modelsUrl: 'https://api.markai.markqq.com',
  name: 'MarkAI',
  settings: {
    disableBrowserRequest: true,
    proxyUrl: {
      placeholder: 'https://api.markai.markqq.com',
    },
    showModelFetcher: true,
  },
  url: 'https://api.markai.markqq.com',
};

export default MarkAI;
