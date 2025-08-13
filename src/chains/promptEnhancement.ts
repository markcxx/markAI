import { globalHelpers } from '@/store/global/helpers';
import { ChatStreamPayload } from '@/types/openai/chat';

export const chainPromptEnhancement = (userPrompt: string): Partial<ChatStreamPayload> => {
  const lang = globalHelpers.getCurrentLanguage();

  const systemPrompts = {
    'en-US': `You are a professional AI image prompt optimization expert. Your task is to transform user-provided simple descriptions into detailed, professional AI image prompts.

Please follow these requirements:
1. Output the optimized prompt directly without any explanations or additional text
2. While maintaining the user's original intent, add professional descriptions of artistic style, composition, lighting, and color
3. Output in English, as most AI image models respond better to English prompts
4. Ensure the prompt is specific and vivid to help AI generate high-quality images
5. If the user input is already in English, optimize and enhance it based on that

Output language: English`,
    'zh-CN': `你是一位专业的AI绘画提示词优化专家。你的任务是将用户提供的简单描述转换为详细、专业的AI绘画提示词。

请遵循以下要求：
1. 直接输出优化后的提示词，不要添加任何解释或额外文字
2. 保持用户原意的基础上，增加艺术风格、构图、光影、色彩等专业描述
3. 使用英文输出，因为大多数AI绘画模型对英文提示词响应更好
4. 确保提示词具体、生动，能够帮助AI生成高质量的图像
5. 如果用户输入已经是英文，请在此基础上进行优化和增强

输出语言：英文`,
  };

  const systemContent = systemPrompts[lang as keyof typeof systemPrompts] || systemPrompts['en-US'];

  return {
    messages: [
      {
        content: systemContent,
        role: 'system',
      },
      {
        content: userPrompt,
        role: 'user',
      },
    ],
  };
};
