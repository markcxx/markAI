import { AIChatModelCard, AIImageModelCard } from '@/types/aiModel';

const modelscopeChatModels: AIChatModelCard[] = [
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 131_072,
    description:
      'DeepSeek R1 通过利用增加的计算资源和在后训练过程中引入算法优化机制，显著提高了其推理和推断能力的深度。该模型在各种基准评估中表现出色，包括数学、编程和一般逻辑方面。其整体性能现已接近领先模型，如 O3 和 Gemini 2.5 Pro。',
    displayName: 'DeepSeek-R1-0528',
    enabled: true,
    id: 'deepseek-ai/DeepSeek-R1-0528',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description: 'DeepSeek-V3是DeepSeek第三代模型的最新版本，具有强大的推理和对话能力。',
    displayName: 'DeepSeek-V3',
    enabled: true,
    id: 'deepseek-ai/DeepSeek-V3',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 131_072,
    description: 'DeepSeek-R1是DeepSeek最新的推理模型，专注于复杂推理任务。',
    displayName: 'DeepSeek-R1',
    enabled: true,
    id: 'deepseek-ai/DeepSeek-R1',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description: 'Qwen3-235B-A22B是通义千问3代超大规模模型，提供顶级的AI能力。',
    displayName: 'Qwen3-235B-A22B',
    enabled: true,
    id: 'Qwen/Qwen3-235B-A22B',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description: 'Qwen3-32B是通义千问3代模型，具有强大的推理和对话能力。',
    displayName: 'Qwen3-32B',
    enabled: true,
    id: 'Qwen/Qwen3-32B',
    type: 'chat',
  },
];
const modelscopeImageModels: AIImageModelCard[] = [
  {
    description:
      '麦橘超然 MajicFlus 是一款基于 flux.dev 微调融合的模型，专注于高质量人像生成，尤其擅长表现 亚洲女性 的细腻与美感。模型以 唯美、写实、易用 为核心特色，能够通过简单的提示词生成优质效果，同时对复杂提示词也有出色的响应能力。',
    displayName: 'MAILAND/majicflus_v1',
    enabled: true,
    id: 'MAILAND/majicflus_v1',
    parameters: {
      prompt: {
        default: '',
      },
      size: {
        default: '1024x1024',
        enum: ['1024x1024', '768x768', '512x512'],
      },
    },
    type: 'image',
  },
  {
    description:
      'FLUX.1 Krea [dev] 是一个具有 120 亿参数的修正流变换器，能够根据文本描述生成图像。',
    displayName: 'black-forest-labs/FLUX.1-Krea-dev',
    enabled: true,
    id: 'black-forest-labs/FLUX.1-Krea-dev',
    parameters: {
      prompt: {
        default: '',
      },
      size: {
        default: '1024x1024',
        enum: ['1024x1024', '768x768', '512x512'],
      },
    },
    type: 'image',
  },
  {
    description: 'FLUX.1 [dev] 是一个具有 120 亿参数的修正流变换器，能够根据文本描述生成图像。',
    displayName: 'MusePublic/489_ckpt_FLUX_1',
    enabled: true,
    id: 'MusePublic/489_ckpt_FLUX_1',
    parameters: {
      prompt: {
        default: '',
      },
      size: {
        default: '1024x1024',
        enum: ['1024x1024', '768x768', '512x512'],
      },
    },
    type: 'image',
  },
];

export const allModels = [...modelscopeChatModels, ...modelscopeImageModels];

export default allModels;
