'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Block, Text } from '@lobehub/ui';
import { Spin } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center } from 'react-layout-kit';

import { AsyncTaskStatus } from '@/types/asyncTask';

import { ActionButtons } from './ActionButtons';
import { ElapsedTime } from './ElapsedTime';
import { useStyles } from './styles';
import { LoadingStateProps } from './types';

// 加载状态组件
export const LoadingState = memo<LoadingStateProps>(({ generation, aspectRatio, onDelete }) => {
  const { styles } = useStyles();
  const { t } = useTranslation('image');

  const isGenerating =
    generation.task.status === AsyncTaskStatus.Processing ||
    generation.task.status === AsyncTaskStatus.Pending;

  return (
    <Block
      align={'center'}
      className={styles.placeholderContainer}
      justify={'center'}
      style={{
        aspectRatio,
        maxWidth: generation.asset?.width ? Math.min(generation.asset.width / 2, 320) : 320,
      }}
    >
      <Center gap={8}>
        <Spin indicator={<LoadingOutlined className={styles.spinIcon} spin />} />
        <Center gap={4} horizontal>
          <Text className={styles.text}>{t('generation.status.generating')}</Text>
          <ElapsedTime
            className={styles.text}
            generationId={generation.id}
            isActive={isGenerating}
          />
        </Center>
      </Center>
      <ActionButtons onDelete={onDelete} />
    </Block>
  );
});

LoadingState.displayName = 'LoadingState';
