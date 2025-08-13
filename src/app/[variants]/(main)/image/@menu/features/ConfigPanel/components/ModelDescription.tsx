'use client';

import { Text } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useImageStore } from '@/store/image';
import { imageGenerationConfigSelectors } from '@/store/image/selectors';
import { getModelPropertyWithFallback } from '@/utils/getFallbackModelProperty';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    padding-block: 12px;
    padding-inline: 16px;
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;

    background: ${token.colorBgContainer};

    transition: all 0.2s ease;

    &:hover {
      border-color: ${token.colorBorderSecondary};
      background: ${token.colorBgTextHover};
    }
  `,

  description: css`
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: ${token.colorTextSecondary};
  `,

  title: css`
    margin-block-end: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
  `,
}));

const ModelDescription = memo(() => {
  const { styles } = useStyles();

  const [currentModel, currentProvider] = useImageStore((s) => [
    imageGenerationConfigSelectors.model(s),
    imageGenerationConfigSelectors.provider(s),
  ]);
  // 获取模型的description
  const modelName = getModelPropertyWithFallback<string>(
    currentModel,
    'displayName',
    currentProvider,
  );

  // 获取模型的description
  const modelDescription = getModelPropertyWithFallback<string>(
    currentModel,
    'description',
    currentProvider,
  );

  // 如果没有description，不显示卡片
  if (!modelDescription) {
    return null;
  }

  return (
    <div className={styles.card}>
      <Flexbox gap={0}>
        <Text className={styles.title}>{modelName}</Text>
        <Text className={styles.description}>{modelDescription}</Text>
      </Flexbox>
    </div>
  );
});

ModelDescription.displayName = 'ModelDescription';

export default ModelDescription;
