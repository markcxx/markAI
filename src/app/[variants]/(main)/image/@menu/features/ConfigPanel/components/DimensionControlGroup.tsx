'use client';

import { SliderWithInput } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useDimensionControl } from '@/store/image/slices/generationConfig/hooks';

import AspectRatioSelect from './AspectRatioSelect';

const styles = {
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
} as const;

const DimensionControlGroup = memo(() => {
  const { t } = useTranslation('image');
  const { width, height, setWidth, setHeight, widthSchema, heightSchema } = useDimensionControl();

  return (
    <Flexbox gap={16}>
      {/* 宽高比选择器 */}
      <AspectRatioSelect />

      {/* 宽度滑块 */}
      {widthSchema && (
        <Flexbox gap={8}>
          <span style={styles.label}>{t('config.width.label')}</span>
          <SliderWithInput
            max={widthSchema.max}
            min={widthSchema.min}
            onChange={setWidth}
            value={width ?? widthSchema.min}
          />
        </Flexbox>
      )}

      {/* 高度滑块 */}
      {heightSchema && (
        <Flexbox gap={8}>
          <span style={styles.label}>{t('config.height.label')}</span>
          <SliderWithInput
            max={heightSchema.max}
            min={heightSchema.min}
            onChange={setHeight}
            value={height ?? heightSchema.min}
          />
        </Flexbox>
      )}
    </Flexbox>
  );
});

DimensionControlGroup.displayName = 'DimensionControlGroup';

export default DimensionControlGroup;
