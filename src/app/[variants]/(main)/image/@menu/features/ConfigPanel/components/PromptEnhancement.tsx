'use client';

import { createStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import InstantSwitch from '@/components/InstantSwitch';
import { imageGenerationConfigSelectors } from '@/store/image/selectors';
import { useImageStore } from '@/store/image/store';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    padding: 12px;
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    background: ${token.colorFillQuaternary};
  `,
  description: css`
    font-size: 12px;
    line-height: 1.4;
    color: ${token.colorTextSecondary};
  `,
  title: css`
    margin-block-end: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
  `,
}));

const PromptEnhancement = memo(() => {
  const { t } = useTranslation('image');
  const { styles } = useStyles();

  const [enabled, togglePromptEnhancement] = useImageStore((s) => [
    imageGenerationConfigSelectors.promptEnhancementEnabled(s),
    s.togglePromptEnhancement,
  ]);

  return (
    <div className={styles.container}>
      <Flexbox align="center" horizontal justify="space-between">
        <Flexbox gap={4}>
          <div className={styles.title}>{t('enhancement.title')}</div>
          <div className={styles.description}>{t('enhancement.description')}</div>
        </Flexbox>
        <InstantSwitch
          enabled={enabled}
          onChange={async () => {
            togglePromptEnhancement();
          }}
        />
      </Flexbox>
    </div>
  );
});

export default PromptEnhancement;
