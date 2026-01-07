'use client';

import { Text } from '@lobehub/ui';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { imageGenerationConfigSelectors } from '@/store/image/selectors';
import { useDimensionControl } from '@/store/image/slices/generationConfig/hooks';
import { useImageStore } from '@/store/image/store';

import DimensionControlGroup from './components/DimensionControlGroup';
import ImageNum from './components/ImageNum';
import ImageUrl from './components/ImageUrl';
import ImageUrlsUpload from './components/ImageUrlsUpload';
import ModelDescription from './components/ModelDescription';
import ModelSelect from './components/ModelSelect';
import PromptEnhancement from './components/PromptEnhancement';
import SeedNumberInput from './components/SeedNumberInput';
import SizeSelect from './components/SizeSelect';
import StepsSliderInput from './components/StepsSliderInput';

interface ConfigItemLayoutProps {
  children: ReactNode;
  label?: string;
}

const ConfigItemLayout = memo<ConfigItemLayoutProps>(({ label, children }) => {
  return (
    <Flexbox gap={8}>
      {label && <Text weight={500}>{label}</Text>}
      {children}
    </Flexbox>
  );
});

const isSupportedParamSelector = imageGenerationConfigSelectors.isSupportedParam;

const ConfigPanel = memo(() => {
  const { t } = useTranslation('image');

  const isSupportImageUrl = useImageStore(isSupportedParamSelector('imageUrl'));
  const isSupportSize = useImageStore(isSupportedParamSelector('size'));
  const isSupportAspectRatio = useImageStore(isSupportedParamSelector('aspectRatio'));
  const isSupportSeed = useImageStore(isSupportedParamSelector('seed'));
  const isSupportSteps = useImageStore(isSupportedParamSelector('steps'));
  const isSupportImageUrls = useImageStore(isSupportedParamSelector('imageUrls'));

  const { showDimensionControl } = useDimensionControl();

  // 如果支持aspectRatio，则不显示size选择器，因为DimensionControlGroup已经包含了aspectRatio选择器
  const shouldShowSizeSelect = isSupportSize && !isSupportAspectRatio;

  return (
    <Flexbox gap={32} padding={12}>
      <ConfigItemLayout>
        <ModelSelect />
      </ConfigItemLayout>

      {isSupportImageUrl && (
        <ConfigItemLayout label={t('config.imageUrl.label')}>
          <ImageUrl />
        </ConfigItemLayout>
      )}

      <ConfigItemLayout label={t('config.imageUrls.label')}>
        <ImageUrlsUpload />
      </ConfigItemLayout>

      {shouldShowSizeSelect && (
        <ConfigItemLayout label={t('config.size.label')}>
          <SizeSelect />
        </ConfigItemLayout>
      )}

      {showDimensionControl && <DimensionControlGroup />}

      {isSupportSteps && (
        <ConfigItemLayout label={t('config.steps.label')}>
          <StepsSliderInput />
        </ConfigItemLayout>
      )}

      {isSupportSeed && (
        <ConfigItemLayout label={t('config.seed.label')}>
          <SeedNumberInput />
        </ConfigItemLayout>
      )}

      <ConfigItemLayout label={t('config.imageNum.label')}>
        <ImageNum />
      </ConfigItemLayout>

      <PromptEnhancement />

      <ModelDescription />
    </Flexbox>
  );
});

export default ConfigPanel;
