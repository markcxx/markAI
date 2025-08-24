import { ClientOptions } from 'openai';

import { LobeOpenAI } from '../openai';
import { ModelProvider } from '../types';

export interface LobeMarkAIConfig {
  [key: string]: any;
  apiKey?: string;
  baseURL?: string;
}

export class LobeMarkAI extends LobeOpenAI {
  constructor(config: LobeMarkAIConfig = {}) {
    const { apiKey, baseURL = 'https://api.chatai.markqq.com/v1', ...rest } = config;

    const clientOptions: ClientOptions = {
      apiKey: apiKey || process.env.MARKAI_API_KEY,
      baseURL,
      ...rest,
    };

    super(clientOptions);

    this.baseURL = baseURL;
  }

  get modelProvider(): ModelProvider {
    return ModelProvider.MarkAI;
  }
}

export default LobeMarkAI;
