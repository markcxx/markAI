import { AIChatModelCard } from '@/types/aiModel';
import { formatModelName } from '@/utils/formatModelName';

const markaiChatModels: AIChatModelCard[] = [
  {
    contextWindowTokens: 128_000,
    description: 'DeepSeek-V3.1 是 DeepSeek 最新的大型语言模型，具有强大的推理和代码生成能力',
    displayName: formatModelName('deepseek-ai/DeepSeek-V3.1:fireworks-ai'),
    enabled: true,
    id: 'deepseek-ai/DeepSeek-V3.1:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'DeepSeek-R1 是 DeepSeek 最新的推理模型，专注于复杂推理任务',
    displayName: formatModelName('deepseek-ai/DeepSeek-R1:fireworks-ai'),
    enabled: true,
    id: 'deepseek-ai/DeepSeek-R1:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'GPT OSS 120B 是一个开源的大型语言模型，提供强大的对话和文本生成能力',
    displayName: formatModelName('openai/gpt-oss-120b'),
    enabled: true,
    id: 'openai/gpt-oss-120b',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'GPT OSS 20B 是一个开源的中型语言模型，平衡性能和效率',
    displayName: formatModelName('openai/gpt-oss-20b'),
    enabled: true,
    id: 'openai/gpt-oss-20b',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'GLM-4.5 是智谱AI开发的多模态大型语言模型，支持文本理解和生成',
    displayName: formatModelName('zai-org/GLM-4.5:fireworks-ai'),
    enabled: true,
    id: 'zai-org/GLM-4.5:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'GLM-4.5V 是智谱AI开发的视觉多模态模型，支持图像理解',
    displayName: formatModelName('zai-org/GLM-4.5V:novita'),
    enabled: true,
    id: 'zai-org/GLM-4.5V:novita',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'GLM-4.5-Air 是智谱AI开发的轻量级模型，快速响应',
    displayName: formatModelName('zai-org/GLM-4.5-Air:fireworks-ai'),
    enabled: true,
    id: 'zai-org/GLM-4.5-Air:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'Kimi-K2-Instruct 是月之暗面开发的指令微调模型',
    displayName: formatModelName('moonshotai/Kimi-K2-Instruct:fireworks-ai'),
    enabled: true,
    id: 'moonshotai/Kimi-K2-Instruct:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'Qwen3-Coder-480B 是阿里云开发的超大规模代码生成模型',
    displayName: formatModelName('Qwen/Qwen3-Coder-480B-A35B-Instruct:fireworks-ai'),
    enabled: true,
    id: 'Qwen/Qwen3-Coder-480B-A35B-Instruct:fireworks-ai',
    type: 'chat',
  },
  {
    contextWindowTokens: 128_000,
    description: 'Qwen3-235B 是阿里云开发的思维链推理模型',
    displayName: formatModelName('Qwen/Qwen3-235B-A22B-Thinking-2507:fireworks-ai'),
    enabled: true,
    id: 'Qwen/Qwen3-235B-A22B-Thinking-2507:fireworks-ai',
    type: 'chat',
  },
];

export const allModels = [...markaiChatModels];

export default allModels;
