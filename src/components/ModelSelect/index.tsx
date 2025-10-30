import { IconAvatarProps, ModelIcon, ProviderIcon } from '@lobehub/icons';
import { Avatar, Icon, Tag, Text, Tooltip } from '@lobehub/ui';
import { createStyles, useResponsive } from 'antd-style';
import {
  Infinity,
  AtomIcon,
  LucideEye,
  LucideGlobe,
  LucideImage,
  LucidePaperclip,
  ToyBrick,
} from 'lucide-react';
import numeral from 'numeral';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelAbilities } from '@/types/aiModel';
import { AiProviderSourceType } from '@/types/aiProvider';
import { ChatModelCard } from '@/types/llm';
import { formatTokenNumber } from '@/utils/format';
import { formatModelDisplayName } from '@/utils/formatModelName';

export const TAG_CLASSNAME = 'lobe-model-info-tags';

const useStyles = createStyles(({ css, token }) => ({
  tag: css`
    cursor: default;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px !important;
    height: 20px;
    border-radius: 4px;
  `,
  token: css`
    width: 36px !important;
    height: 20px;
    border-radius: 4px;

    font-family: ${token.fontFamilyCode};
    font-size: 11px;
    color: ${token.colorTextSecondary};

    background: ${token.colorFillTertiary};
  `,
}));

interface ModelInfoTagsProps extends ModelAbilities {
  contextWindowTokens?: number | null;
  directionReverse?: boolean;
  isCustom?: boolean;
  placement?: 'top' | 'right';
}

export const ModelInfoTags = memo<ModelInfoTagsProps>(
  ({ directionReverse, placement = 'right', ...model }) => {
    const { t } = useTranslation('components');
    const { styles } = useStyles();

    return (
      <Flexbox
        className={TAG_CLASSNAME}
        direction={directionReverse ? 'horizontal-reverse' : 'horizontal'}
        gap={4}
        width={'fit-content'}
      >
        {model.files && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('ModelSelect.featureTag.file')}
          >
            <Tag className={styles.tag} color={'success'} size={'small'}>
              <Icon icon={LucidePaperclip} />
            </Tag>
          </Tooltip>
        )}
        {model.imageOutput && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('ModelSelect.featureTag.imageOutput')}
          >
            <Tag className={styles.tag} color={'success'} size={'small'}>
              <Icon icon={LucideImage} />
            </Tag>
          </Tooltip>
        )}
        {model.vision && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('ModelSelect.featureTag.vision')}
          >
            <Tag className={styles.tag} color={'success'} size={'small'}>
              <Icon icon={LucideEye} />
            </Tag>
          </Tooltip>
        )}
        {model.functionCall && (
          <Tooltip
            placement={placement}
            styles={{
              root: { maxWidth: 'unset', pointerEvents: 'none' },
            }}
            title={t('ModelSelect.featureTag.functionCall')}
          >
            <Tag className={styles.tag} color={'info'} size={'small'}>
              <Icon icon={ToyBrick} />
            </Tag>
          </Tooltip>
        )}
        {model.reasoning && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('ModelSelect.featureTag.reasoning')}
          >
            <Tag className={styles.tag} color={'purple'} size={'small'}>
              <Icon icon={AtomIcon} />
            </Tag>
          </Tooltip>
        )}
        {model.search && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('ModelSelect.featureTag.search')}
          >
            <Tag className={styles.tag} color={'cyan'} size={'small'}>
              <Icon icon={LucideGlobe} />
            </Tag>
          </Tooltip>
        )}
        {typeof model.contextWindowTokens === 'number' && (
          <Tooltip
            placement={placement}
            styles={{
              root: { maxWidth: 'unset', pointerEvents: 'none' },
            }}
            title={t('ModelSelect.featureTag.tokens', {
              tokens:
                model.contextWindowTokens === 0
                  ? '∞'
                  : numeral(model.contextWindowTokens).format('0,0'),
            })}
          >
            <Tag className={styles.token} size={'small'}>
              {model.contextWindowTokens === 0 ? (
                <Infinity size={17} strokeWidth={1.6} />
              ) : (
                formatTokenNumber(model.contextWindowTokens as number)
              )}
            </Tag>
          </Tooltip>
        )}
      </Flexbox>
    );
  },
);

// 默认模型标签配置 - 暂时注释掉
// const defaultModelTagConfig = {
//   bgColor: 'rgba(24, 144, 255, 0.3)',
//   labelColor: { dark: '#ffffff', light: '#1677ff' },
// };

// 模型标签信息类型
type ModelTagInfo = {
  bgColor?: string;
  label: string;
  labelColor?: {
    dark: string;
    light: string;
  };
};

// 按提供商分组的模型标签配置
const modelTagMap: Record<string, Record<string, ModelTagInfo>> = {
  anthropic: {
    'claude-opus-4-20250514': {
      label: '最新模型',
    },
    'claude-sonnet-4-20250514': {
      label: '最强编程模型',
    },
  },
  deepseek: {
    'deepseek-chat': {
      label: '对话',
    },
    'deepseek-reasoner': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '推理',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  google: {
    'gemini-2.5-flash': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '快速、成本低',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gemini-2.5-pro': {
      label: '最强多模态模型',
    },
  },
  groq: {
    'moonshotai/kimi-k2-instruct-0905': {
      label: '1T 参数 MoE 模型 Kimi最强模型',
    },
    'openai/gpt-oss-120b': {
      label: '117B 参数 OpenAI开源重量级推理模型',
    },
    'openai/gpt-oss-20b': {
      label: '21B 参数 激活 ~3.6B',
    },
    'qwen/qwen3-32b': {
      label: '32B 全密集模型',
    },
  },
  infiniai: {
    'claude-sonnet-4-20250514': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最强编程模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-r1': {
      label: 'Deepseek推理模型',
    },
    'deepseek-r1-0528-qwen3-8b': {
      label: 'Deepseek蒸馏模型',
    },
    'deepseek-r1-distill-qwen-32b': {
      label: 'Deepseek蒸馏模型',
    },
    'deepseek-v3': {
      label: 'Deepseek V3 模型',
    },
    'deepseek-v3.1': {
      label: 'Deepseek V3.1 模型',
    },
    'deepseek-v3.2-exp': {
      label: '最新 V3.2 实验模型',
    },
    'ernie-4.5-300b-a47b': {
      label: '百度文心一言300b模型',
    },
    'gemini-2.5-flash': {
      label: '快速、成本低',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gemini-2.5-pro': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最强多模态模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gemini-flash-latest': {
      label: 'gemini-2.5-flash永久别名',
    },
    'gemini-flash-lite-latest': {
      label: 'gemini-2.5-flash-lite永久别名',
    },
    'glm-4.5': {
      label: '智谱GLM-4.5',
    },
    'glm-4.5-air': {
      label: '智谱GLM-4.5-AIR轻量版',
    },
    'glm-4.5v': {
      label: '智谱GLM-4.5-V多模态模型',
    },
    'glm-4.6': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '智谱最新GLM-4.6',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gpt-4.1': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'OpenAI 最通用全能选手',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gpt-4o': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '多模态 + 语音 + 视觉能力强',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gpt-oss-120b': {
      label: '120B 参数 OpenAI开源重量级推理模型',
    },
    'kimi-k2-instruct': {
      label: '开源旗舰推理版本',
    },
    'qwen2.5-vl-72b-instruct': {
      label: 'Qwen2.5 多模态模型',
    },
    'qwen3-235b-a22b': {
      label: '重量级旗舰版本',
    },
    'qwen3-235b-a22b-instruct-2507': {
      label: '指令版本的旗舰型号',
    },
    'qwen3-coder-480b-a35b-instruct': {
      label: 'Qwen3 代码模型 极大规模的编码版本',
    },
    'qwen3-next-80b-a3b-instruct': {
      label: 'Qwen3 Next 80B 指令模型',
    },
    'qwen3-next-80b-a3b-thinking': {
      label: 'Qwen3 Next 80B 推理模型',
    },
  },
  markai: {
    'MiniMax-M2': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'MiniMax 第二代模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'Qwen/Qwen2.5-VL-72B-Instruct:nebius': {
      label: 'Qwen2.5 多模态模型',
    },
    'Qwen/Qwen3-235B-A22B-Thinking-2507:fireworks-ai': {
      label: 'Qwen3 重量级旗舰版本',
    },
    'Qwen/Qwen3-Next-80B-A3B-Instruct:novita': {
      label: 'Qwen3 Next 80B 指令模型',
    },
    'Qwen/Qwen3-Next-80B-A3B-Thinking:novita': {
      label: 'Qwen3 Next 80B 推理模型',
    },
    'Qwen/Qwen3-VL-235B-A22B-Thinking:novita': {
      label: 'Qwen3 旗舰版本多模态模型',
    },
    'claude-haiku-4-5-20251001': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '快速、成本低',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'claude-sonnet-4-20250514': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最强编程模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'claude-sonnet-4-5-20250929': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最强编程模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-ai/DeepSeek-R1:fireworks-ai': {
      label: 'Deepseek推理模型',
    },
    'deepseek-ai/DeepSeek-V3.1-Terminus:novita': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最新 V3.1 "终结一代"版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-ai/DeepSeek-V3.1:fireworks-ai': {
      label: 'Deepseek V3.1 通用版本',
    },
    'deepseek-ai/DeepSeek-V3.2-Exp:novita': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最新 V3.2 实验版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gpt-4o': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '多模态 + 语音 + 视觉能力强',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'moonshotai/Kimi-K2-Instruct-0905:novita': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '1T 参数 MoE 模型 Kimi最强模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'openai/gpt-oss-120b': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '120B 参数 OpenAI开源重量级推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'xai/grok-3': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'xAI Grok-3 模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'zai-org/GLM-4.5:fireworks-ai': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '智谱 GLM 4.5模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'zai-org/GLM-4.5V:novita': {
      label: '多模态 GLM 版本',
    },
    'zai-org/GLM-4.6:novita': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '智谱最新GLM-4.6',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  modelscope: {
    'Qwen/Qwen3-235B-A22B-Instruct-2507': {
      label: 'Qwen3 指令版本的旗舰型号',
    },
    'Qwen/Qwen3-235B-A22B-Thinking-2507': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 重量级旗舰版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'Qwen/Qwen3-Coder-480B-A35B-Instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 代码模型 极大规模的编码版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'Qwen/Qwen3-Next-80B-A3B-Instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 Next 80B 指令模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'Qwen/Qwen3-Next-80B-A3B-Thinking': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 Next 80B 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'Qwen/Qwen3-VL-235B-A22B-Instruct': {
      label: 'Qwen3 多模态版本的旗舰型号',
    },
    'ZhipuAI/GLM-4.5': {
      label: '智谱 GLM 4.5模型',
    },
    'ZhipuAI/GLM-4.6': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '智谱最新GLM-4.6',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-ai/DeepSeek-R1-0528': {
      label: 'Deepseek 推理版本',
    },
    'deepseek-ai/DeepSeek-V3': {
      label: 'Deepseek V3 通用版本',
    },
    'deepseek-ai/DeepSeek-V3.1': {
      label: 'Deepseek V3.1 通用版本',
    },
    'deepseek-ai/DeepSeek-V3.2-Exp': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最新 V3.2 实验模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'moonshotai/Kimi-K2-Instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '1T 参数 MoE 模型 Kimi最强模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'stepfun-ai/step3': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '321B 参数的多模态推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  moonshot: {
    'kimi-k2-0905-preview': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '1T 参数 MoE 模型 Kimi最强模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  openai: {
    'gpt-4': {
      label: '中高端版本',
    },
    'gpt-4-0125-preview': {
      label: '中高端版本',
      labelColor: { dark: '#ffffff', light: '#52c41a' },
    },
    'gpt-4-0613': {
      label: '中高端版本',
    },
    'gpt-4-1106-preview': {
      label: '中高端版本',
      labelColor: { dark: '#ffffff', light: '#52c41a' },
    },
    'gpt-4-turbo': {
      label: '速度性能优化',
    },
    'gpt-4-turbo-2024-04-09': {
      label: '速度性能优化',
    },
    'gpt-4-turbo-preview': {
      label: '速度性能优化',
      labelColor: { dark: '#ffffff', light: '#52c41a' },
    },
    'gpt-4.1': {
      label: '新一代 “4.1” 系列',
    },
    'gpt-4o': {
      label: '多模态 /视觉 /语音能力突出的版本',
    },
    'gpt-4o-2024-05-13': {
      label: '对标 o1 的升级版本',
    },
    'gpt-4o-search-preview-2025-03-11': {
      label: '多模态 /视觉 /语音能力突出的版本',
    },
    'gpt-5': {
      label: '暂不可用',
    },
    'gpt-5-mini': {
      label: '暂不可用',
    },
    'gpt-5-nano-2025-08-07': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'GTP-5模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'o1': {
      label: '“思考型 /推理型”系列模型',
    },
    'o1-pro-2025-03-19': {
      label: '“思考型 /推理型”系列模型',
    },
    'o3': {
      label: '对标 o1 的升级版本',
    },
  },
  openrouter: {
    'deepseek/deepseek-chat-v3-0324:free': {
      label: 'Deepseek 对话模型',
    },
    'deepseek/deepseek-chat-v3:free': {
      label: 'Deepseek 对话模型',
    },
    'deepseek/deepseek-r1-0528:free': {
      label: 'Deepseek 推理版本',
    },
    'moonshotai/kimi-k2:free': {
      label: '1T 参数 MoE 模型 Kimi最强模型',
    },
    'x-ai/grok-4-fast:free': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Grok-4',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  qiniu: {
    'claude-4.0-sonnet': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '最强编程模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-r1-0528': {
      label: 'Deepseek 推理版本',
    },
    'doubao-1.5-pro-32k': {
      label: '豆包 长上下文模型',
    },
    'doubao-1.5-thinking-pro': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '豆包 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'doubao-1.5-vision-pro': {
      label: '豆包 多模态模型',
    },
    'doubao-seed-1.6-thinking': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '豆包 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'gpt-oss-120b': {
      label: '120B 参数 OpenAI开源重量级推理模型',
    },
    'moonshotai/kimi-k2-0905': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '1T 参数 MoE 模型 Kimi最强模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'openai/gpt-5': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'GPT-5模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'z-ai/glm-4.6': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '智谱最新GLM-4.6',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  qwen: {
    'Moonshot-Kimi-K2-Instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '1T 参数 MoE 模型 Kimi最强模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-r1': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Deepseek 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'deepseek-v3': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Deepseek 对话模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-235b-a22b': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 重量级旗舰版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-coder-480b-a35b-instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 代码模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-coder-plus-2025-07-22': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 代码模型 07-22版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-coder-plus-2025-09-23': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 Coder Plus 09-23版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-max-2025-09-23': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3万亿参数模型 09-23版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-max-preview': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3万亿参数模型 预览版本',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-next-80b-a3b-instruct': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 Next 80B 指令模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
    'qwen3-next-80b-a3b-thinking': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: 'Qwen3 Next 80B 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
  volcengine: {
    'doubao-seed-1.6-thinking': {
      bgColor: 'rgba(255, 165, 0, 0.9)',
      label: '豆包 推理模型',
      labelColor: { dark: '#ffffff', light: '#ff8c00' },
    },
  },
};

interface ModelItemRenderProps extends ChatModelCard {
  provider?: string;
  showInfoTag?: boolean;
}

export const ModelItemRender = memo<ModelItemRenderProps>(
  ({ showInfoTag = true, provider, ...model }) => {
    const { mobile } = useResponsive();
    // const { isDarkMode } = useThemeMode(); // 暂时注释掉，因为标签被注释了
    const displayName = formatModelDisplayName(model.id, model.displayName, provider);

    // 获取模型标签信息 - 暂时注释掉
    // const modelTagInfo = provider && modelTagMap[provider]?.[model.id];

    return (
      <Flexbox
        align={'center'}
        gap={32}
        horizontal
        justify={'space-between'}
        style={{
          minWidth: mobile ? '100%' : undefined,
          overflow: 'hidden',
          position: 'relative',
          width: mobile ? '80vw' : 'auto',
        }}
      >
        <Flexbox
          align={'center'}
          gap={8}
          horizontal
          style={{ flexShrink: 1, minWidth: 0, overflow: 'hidden' }}
        >
          <ModelIcon model={model.id} size={20} />
          <Text style={mobile ? { maxWidth: '60vw', overflowX: 'auto', whiteSpace: 'nowrap' } : {}}>
            {displayName}
          </Text>
          {/* 暂时注释掉模型标签显示 */}
          {/* {modelTagInfo && (
            <Tag
              style={{
                backgroundColor: modelTagInfo.bgColor || defaultModelTagConfig.bgColor,
                border: 'none',
                color: isDarkMode
                  ? modelTagInfo.labelColor?.dark || defaultModelTagConfig.labelColor.dark
                  : modelTagInfo.labelColor?.light || defaultModelTagConfig.labelColor.light,
                fontSize: '11px',
                height: '18px',
                lineHeight: '16px',
                padding: '0 6px',
              }}
            >
              {modelTagInfo.label}
            </Tag>
          )} */}
        </Flexbox>
        {showInfoTag && <ModelInfoTags {...model} />}
      </Flexbox>
    );
  },
);

interface ProviderItemRenderProps {
  logo?: string;
  name: string;
  provider: string;
  showTag?: boolean;
  source?: AiProviderSourceType;
}

// 提供商标签映射
type ProviderTagInfo = {
  bgColor: string;
  label: string;
  labelColor: {
    dark: string;
    light: string;
  };
  modelColor: string;
  modelName: string;
};

const providerTagMap: Record<string, ProviderTagInfo> = {
  anthropic: {
    bgColor: 'rgba(255, 165, 0, 0.4)',
    label: 'Anthropic',
    labelColor: { dark: '#ffffff', light: '#ff8c00' },
    modelColor: '#ff8c00',
    modelName: 'claude-4-sonnet',
  },
  deepseek: {
    bgColor: 'rgba(24, 144, 255, 0.5)',
    label: '深度求索官方',
    labelColor: { dark: '#ffffff', light: '#1677ff' },
    modelColor: '#1677ff',
    modelName: 'deepseek V3.1',
  },
  google: {
    bgColor: 'rgba(19, 194, 194, 0.4)',
    label: '谷歌gemini大模型',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#40a9ff',
    modelName: 'gemini',
  },
  groq: {
    bgColor: 'rgba(245, 80, 54, 0.4)',
    label: 'Groq',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#40a9ff',
    modelName: 'gpt-oss-120b',
  },
  infiniai: {
    bgColor: 'rgba(114, 46, 209, 0.4)',
    label: '无问芯穹多模型聚合平台',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#ffffff',
    modelName: 'Claude Sonnet 4',
  },
  markai: {
    bgColor: 'rgba(82, 196, 26, 0.4)',
    label: 'MarkAI',
    labelColor: { dark: '#ffffff', light: '#52c41a' },
    modelColor: '#52c41a',
    modelName: 'claude-sonnet-4-5',
  },
  modelscope: {
    bgColor: 'rgba(82, 196, 26, 0.4)',
    label: '魔搭社区 永久可用',
    labelColor: { dark: '#ffffff', light: '#D92C54' },
    modelColor: '#1677ff',
    modelName: 'deepseek-v3.1',
  },
  moonshot: {
    bgColor: 'rgba(24, 144, 255, 0.7)',
    label: '月之暗面',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#ffffff',
    modelName: 'kimi-k2-instruct-0905',
  },
  openai: {
    bgColor: 'rgba(255, 77, 79, 0.5)',
    label: 'OpenAI',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#000000',
    modelName: 'gpt-5',
  },
  openrouter: {
    bgColor: 'rgba(101, 102, 241, 0.9)',
    label: 'OpenRouter',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#000000',
    modelName: 'grok-4',
  },
  qiniu: {
    bgColor: 'rgba(255, 165, 0, 0.4)',
    label: '七牛云',
    labelColor: { dark: '#ffffff', light: '#ff8c00' },
    modelColor: '#ff8c00',
    modelName: 'gpt-5',
  },
  qwen: {
    bgColor: 'rgba(250, 173, 20, 0.4)',
    label: '阿里云通义千问',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#1677ff',
    modelName: 'Qwen3-max',
  },
  spark: {
    bgColor: 'rgba(250, 140, 22, 0.4)',
    label: '讯飞星火大模型',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#1677ff',
    modelName: 'Spark 4.0 Ultra',
  },
  volcengine: {
    bgColor: 'rgba(71, 172, 255, 0.4)',
    label: '火山引擎 豆包',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#ff4500',
    modelName: 'doubao-seed-1.6-thinking',
  },
  zhipu: {
    bgColor: 'rgba(24, 144, 255, 0.4)',
    label: '智谱清言',
    labelColor: { dark: '#ffffff', light: '#1677ff' },
    modelColor: '#1677ff',
    modelName: 'glm-4.5',
  },
};

export const ProviderItemRender = memo<ProviderItemRenderProps>(
  ({ provider, name, source, logo, showTag = true }) => {
    // 获取提供商对应的标签信息 - 暂时注释掉
    // const tagInfo = providerTagMap[provider];
    // 使用 useThemeMode 获取当前主题模式 - 暂时注释掉
    // const { isDarkMode } = useThemeMode();

    // 暂时忽略showTag参数，因为标签功能被注释了
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _showTag = showTag;

    // 判断是否应该使用 Avatar 显示 logo
    const shouldUseAvatar = (source === 'custom' && !!logo) || provider === 'markai';
    const avatarSrc = provider === 'markai' ? '/icons/LOGO.png' : logo;

    return (
      <Flexbox align={'center'} gap={4} horizontal>
        {shouldUseAvatar ? (
          <Avatar avatar={avatarSrc} size={20} style={{ filter: 'grayscale(1)' }} title={name} />
        ) : (
          <ProviderIcon provider={provider} size={20} type={'mono'} />
        )}
        <Flexbox align={'center'} gap={4} horizontal>
          {name}
          {/* 暂时注释掉提供商标签显示 */}
          {/* {showTag && tagInfo && (
            <Tag
              size={'small'}
              style={{
                alignItems: 'center',
                background: tagInfo.bgColor,
                border: 'none',
                borderRadius: '12px',
                display: 'flex',
                gap: '4px',
                padding: '2px 8px',
              }}
            >
              <span style={{ color: tagInfo.modelColor, fontWeight: 500 }}>
                {tagInfo.modelName}
              </span>
              <span
                style={{
                  color: isDarkMode ? tagInfo.labelColor.dark : tagInfo.labelColor.light,
                  fontWeight: 800,
                }}
              >
                {tagInfo.label}
              </span>
            </Tag>
          )} */}
        </Flexbox>
      </Flexbox>
    );
  },
);

interface LabelRendererProps {
  Icon: FC<IconAvatarProps>;
  label: string;
}

export const LabelRenderer = memo<LabelRendererProps>(({ Icon, label }) => (
  <Flexbox align={'center'} gap={8} horizontal>
    <Icon size={20} />
    <span>{label}</span>
  </Flexbox>
));
