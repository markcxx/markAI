'use client';

import { Button, TextArea } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Sparkles, Wand2 } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { chainPromptEnhancement } from '@/chains/promptEnhancement';
import { chatService } from '@/services/chat';
import { useImageStore } from '@/store/image';
import { createImageSelectors, imageGenerationConfigSelectors } from '@/store/image/selectors';
import { useGenerationConfigParam } from '@/store/image/slices/generationConfig/hooks';

import PromptTitle from './Title';

interface PromptInputProps {
  disableAnimation?: boolean;
  showTitle?: boolean;
}

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  container: css`
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG * 1.5}px;
    background-color: ${token.colorBgContainer};
    box-shadow:
      ${token.boxShadowTertiary},
      ${isDarkMode
        ? `0 0 48px 32px ${token.colorBgContainerSecondary}`
        : `0 0 0  ${token.colorBgContainerSecondary}`},
      0 32px 0 ${token.colorBgContainerSecondary};
  `,
  textarea: css`
    resize: none;

    min-height: 64px;
    padding-block: 12px;
    padding-inline: 16px;
    border: 2px solid rgba(0, 0, 0, 6%);
    border-radius: 8px;

    font-size: 14px;
    line-height: 20px;

    background-color: transparent;

    transition: all 0.2s ease;

    &:hover {
      border-color: rgba(22, 119, 255, 40%) !important;
      box-shadow: 0 0 0 2px rgba(22, 119, 255, 10%) !important;
    }

    &:focus {
      border-color: #1677ff !important;
      outline: none !important;
      box-shadow: 0 0 0 2px rgba(22, 119, 255, 20%) !important;
    }
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    width: 100%;
  `,
}));

const PromptInput = ({ showTitle = false }: PromptInputProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation('image');
  const { value, setValue } = useGenerationConfigParam('prompt');
  const isCreating = useImageStore(createImageSelectors.isCreating);
  const createImage = useImageStore((s) => s.createImage);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const promptEnhancementEnabled = useImageStore(
    imageGenerationConfigSelectors.promptEnhancementEnabled,
  );
  const promptEnhancementModel = useImageStore(
    imageGenerationConfigSelectors.promptEnhancementModel,
  );
  const promptEnhancementProvider = useImageStore(
    imageGenerationConfigSelectors.promptEnhancementProvider,
  );

  const handleGenerate = async () => {
    await createImage();
  };

  const handleEnhancePrompt = async () => {
    if (
      !value.trim() ||
      !promptEnhancementEnabled ||
      !promptEnhancementModel ||
      !promptEnhancementProvider
    ) {
      return;
    }

    setIsEnhancing(true);
    try {
      const enhancementPayload = chainPromptEnhancement(value);

      // 转换 OpenAIChatMessage[] 为 ChatMessage[]
      const messages =
        enhancementPayload.messages?.map((msg, index) => ({
          content: typeof msg.content === 'string' ? msg.content : '',
          createdAt: Date.now(),
          id: `enhancement_${index}`,
          meta: {},
          role: msg.role,
          updatedAt: Date.now(),
        })) || [];

      // 使用 Promise 包装回调方式的 API
      const enhancedPrompt = await new Promise<string>((resolve, reject) => {
        let assistantContent = '';

        chatService.createAssistantMessage(
          {
            ...enhancementPayload,
            messages,
            model: promptEnhancementModel,
            provider: promptEnhancementProvider,
          },
          {
            onErrorHandle: (error) => {
              reject(error);
            },
            onFinish: async () => {
              resolve(assistantContent.trim() || value);
            },
            onMessageHandle: (message) => {
              if (message.type === 'text') {
                assistantContent += message.text;
              }
            },
          },
        );
      });

      if (enhancedPrompt && enhancedPrompt !== value) {
        setValue(enhancedPrompt);
      }
    } catch (error) {
      console.error('Prompt enhancement failed:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isCreating && value.trim()) {
        handleGenerate();
      }
    }
  };

  return (
    <Flexbox
      gap={32}
      style={{
        marginTop: 48,
      }}
      width={'100%'}
    >
      {showTitle && <PromptTitle />}

      <Flexbox
        align="flex-end"
        className={styles.container}
        gap={12}
        height={'100%'}
        horizontal
        padding={'12px 12px 12px 16px'}
        width={'100%'}
      >
        <TextArea
          autoSize={{ maxRows: 6, minRows: 3 }}
          className={styles.textarea}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('config.prompt.placeholder')}
          value={value}
        />
        <Flexbox gap={8} horizontal>
          {promptEnhancementEnabled && promptEnhancementModel && promptEnhancementProvider && (
            <Button
              disabled={!value.trim() || isEnhancing || isCreating}
              icon={Wand2}
              loading={isEnhancing}
              onClick={handleEnhancePrompt}
              size={'large'}
              style={{
                fontWeight: 500,
                height: 64,
                minWidth: 64,
                width: 64,
              }}
              title={
                isEnhancing
                  ? t('generation.actions.enhancing')
                  : t('generation.actions.enhancePrompt')
              }
              type={'default'}
            />
          )}
          <Button
            disabled={!value.trim() || isEnhancing || isCreating}
            icon={Sparkles}
            loading={isCreating || isEnhancing}
            onClick={handleGenerate}
            size={'large'}
            style={{
              fontWeight: 500,
              height: 64,
              minWidth: 64,
              width: 64,
            }}
            title={
              isCreating
                ? t('generation.status.generating')
                : isEnhancing
                  ? t('generation.actions.enhancing')
                  : t('generation.actions.generate')
            }
            type={'primary'}
          />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default PromptInput;
