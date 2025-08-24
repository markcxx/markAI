import { IconAvatarProps, ModelIcon, ProviderIcon } from '@lobehub/icons';
import { Avatar, Icon, Tag, Text, Tooltip } from '@lobehub/ui';
import { createStyles, useResponsive, useThemeMode } from 'antd-style';
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

interface ModelItemRenderProps extends ChatModelCard {
  provider?: string;
  showInfoTag?: boolean;
}

export const ModelItemRender = memo<ModelItemRenderProps>(
  ({ showInfoTag = true, provider, ...model }) => {
    const { mobile } = useResponsive();
    const displayName = formatModelDisplayName(model.id, model.displayName, provider);

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
  cloudflare: {
    bgColor: 'rgba(255, 165, 0, 0.4)',
    label: '轻量模型开发者可用',
    labelColor: { dark: '#ffffff', light: '#ff8c00' },
    modelColor: '#ff8c00',
    modelName: 'Qwen2.5 Coder 32B',
  },
  deepseek: {
    bgColor: 'rgba(24, 144, 255, 0.5)',
    label: '深度求索官方',
    labelColor: { dark: '#ffffff', light: '#1677ff' },
    modelColor: '#1677ff',
    modelName: 'deepseek R1',
  },
  google: {
    bgColor: 'rgba(19, 194, 194, 0.4)',
    label: '谷歌gemini大模型',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#40a9ff',
    modelName: 'gemini',
  },
  huggingface: {
    bgColor: 'rgba(82, 196, 26, 0.4)',
    label: 'Hugging Face 永久可用',
    labelColor: { dark: '#ffffff', light: '#D92C54' },
    modelColor: '#1677ff',
    modelName: 'deepseek',
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
    modelName: 'gpt-oss-120b',
  },
  modelscope: {
    bgColor: 'rgba(82, 196, 26, 0.4)',
    label: '魔搭社区 永久可用',
    labelColor: { dark: '#ffffff', light: '#D92C54' },
    modelColor: '#1677ff',
    modelName: 'deepseek',
  },
  moonshot: {
    bgColor: 'rgba(24, 144, 255, 0.7)',
    label: '月之暗面',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#ffffff',
    modelName: 'kimi K2',
  },
  openai: {
    bgColor: 'rgba(255, 77, 79, 0.5)',
    label: 'OpenAI',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#000000',
    modelName: 'gpt 4o',
  },
  qwen: {
    bgColor: 'rgba(250, 173, 20, 0.4)',
    label: '阿里云通义千问',
    labelColor: { dark: '#ffffff', light: '#333333' },
    modelColor: '#1677ff',
    modelName: 'Qwen Plus',
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
    label: '火山引擎 你熟悉的豆包',
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
    // 获取提供商对应的标签信息
    const tagInfo = providerTagMap[provider];
    // 使用 useThemeMode 获取当前主题模式
    const { isDarkMode } = useThemeMode();

    return (
      <Flexbox align={'center'} gap={4} horizontal>
        {source === 'custom' && !!logo ? (
          <Avatar avatar={logo} size={20} style={{ filter: 'grayscale(1)' }} title={name} />
        ) : (
          <ProviderIcon provider={provider} size={20} type={'mono'} />
        )}
        <Flexbox align={'center'} gap={4} horizontal>
          {name}
          {showTag && tagInfo && (
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
          )}
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
