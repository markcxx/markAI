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
    displayName: '麦橘超然 MajicFlus',
    enabled: true,
    id: 'MAILAND/majicflus_v1',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'FLUX.1 Krea [dev] 是一个具有 120 亿参数的修正流变换器，能够根据文本描述生成图像。',
    displayName: 'FLUX.1 Krea-dev',
    enabled: true,
    id: 'black-forest-labs/FLUX.1-Krea-dev',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'FLUX.2 [dev] 是一个具有320亿参数的修正流变换器，能够根据文本指令生成、编辑和组合图像。',
    displayName: 'FLUX.2-dev',
    enabled: true,
    id: 'black-forest-labs/FLUX.2-dev',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description: 'FLUX.1 [dev] 是一个具有 120 亿参数的修正流变换器，能够根据文本描述生成图像。',
    displayName: 'FLUX.1-dev',
    enabled: true,
    id: 'MusePublic/489_ckpt_FLUX_1',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'Qwen/Qwen-Image 是阿里巴巴开发的通义千问文生图模型，支持中文提示词，能够生成高质量的图像。',
    displayName: 'Qwen Image',
    enabled: true,
    id: 'Qwen/Qwen-Image',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'FLUX.1-dev HighRes 是一个基于 FLUX.1-dev 微调得到的模型。通过在数百万张 2048 分辨率左右各类尺寸的图片上进行微调，该模型在 2048、2560 等分辨率下的图像生成质量显著优于原始的 FLUX.1-dev。同时相比使用 FLUX.1-dev 生成 1024 分辨率图片并使用 Real-ESRGAN 等模型进行图像超分辨率，FLUX.1-dev HighRes 生成的原生 2k 分辨率图片在细节、纹理、边缘上的质量显著更优。',
    displayName: 'FLUX.1-dev HighRes',
    enabled: true,
    id: 'MusePublic/flux-high-res',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description: 'FLUX.1-Kontext-Dev 的贡献者未提供更加详细的模型介绍',
    displayName: 'FLUX.1-Kontext-Dev',
    enabled: true,
    id: 'MusePublic/FLUX.1-Kontext-Dev',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      '万象熔炉的14_ckpt_SD_XL 是一款基于 Stable Diffusion XL (SDXL) 1.0 架构进行微调（Fine-tuning）或合并（Merging）的自定义社区模型。它旨在生成具有特定艺术风格和主题的高质量图像，尤其在二次元领域表现突出。',
    displayName: '万象熔炉 14_ckpt_SD_XL',
    enabled: true,
    id: 'MusePublic/14_ckpt_SD_XL',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'MusePublic/14_ckpt_SD_XL 是一款由社区创作者 MusePublic 开发的、基于 Stable Diffusion XL (SDXL) 1.0 架构的写实主义风格微调模型。它专为生成高质量、富有真实感和摄影美学的图像而设计，尤其在亚洲人物肖像领域表现极为出色，以其干净、细腻且赏心悦目的画风而受到社区用户的欢迎。',
    displayName: 'sd35_large',
    enabled: true,
    id: 'muse/sd35_large',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      '红潮 -12b-10steps-FP16-AIGC不依赖于Stable Diffusion系列的技术栈，而是采用了先进的扩散变换器（Diffusion Transformer, DiT）架构。该模型的核心亮点在于其庞大的120亿（12B）参数规模和极致的生成效率，能够在短短10个采样步数内生成媲美业界顶尖水平的高质量图像。',
    displayName: '红潮 -12b-10steps-FP16-AIGC',
    enabled: true,
    id: 'qijitech/RedCraft-12b-10steps-FP16-AIGC',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'MusePublic/332_ckpt_SD_XL 在官方的 Stable Diffusion XL 1.0 基础上，通过使用特定的高质量图像数据集进行额外训练（即"微调"）得到的"特化版"模型。该模型在保持原始模型的生成能力的同时，针对特定的图像风格（水墨风）进行了优化，能够生成符合该风格的高质量图像。',
    displayName: '快速生图水墨风',
    enabled: true,
    id: 'MusePublic/332_ckpt_SD_XL',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
  {
    description:
      'MusePublic/329_ckpt_SD_XL 在官方的 Stable Diffusion XL 1.0 基础上，通过使用特定的高质量图像数据集进行额外训练（即"微调"）得到的"特化版"模型。该模型在保持原始模型的生成能力的同时，针对特定的图像风格（粘土风）进行了优化，能够生成符合该风格的高质量图像。',
    displayName: '快速生图黏土风',
    enabled: true,
    id: 'MusePublic/329_ckpt_SD_XL',
    parameters: {
      aspectRatio: {
        default: '1:1',
        enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      },
      prompt: {
        default: '',
      },
    },
    type: 'image',
  },
];

export const allModels = [...modelscopeChatModels, ...modelscopeImageModels];

export default allModels;
