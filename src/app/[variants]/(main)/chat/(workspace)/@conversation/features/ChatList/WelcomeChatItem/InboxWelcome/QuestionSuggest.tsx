'use client';

import { ActionIcon, Block } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { shuffle } from 'lodash-es';
import { ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { BRANDING_NAME } from '@/const/branding';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useChatStore } from '@/store/chat';

const useStyles = createStyles(({ css, token, responsive }) => ({
  card: css`
    padding-block: 12px;
    padding-inline: 24px;
    border-radius: 48px;

    color: ${token.colorText};

    background: ${token.colorBgContainer};

    ${responsive.mobile} {
      padding-block: 8px;
      padding-inline: 16px;
    }
  `,
  icon: css`
    color: ${token.colorTextSecondary};
  `,
  title: css`
    color: ${token.colorTextDescription};
  `,
}));

const allQuestions = [
  'q01',
  'q02',
  'q03',
  'q04',
  'q05',
  'q06',
  'q07',
  'q08',
  'q09',
  'q10',
  'q11',
  'q12',
  'q13',
  'q14',
  'q15',
];

const QuestionSuggest = memo<{ mobile?: boolean }>(({ mobile }) => {
  const [updateInputMessage] = useChatStore((s) => [s.updateInputMessage]);
  const [randomSeed, setRandomSeed] = useState(() => Math.floor(Math.random() * 10_000));

  const { t } = useTranslation('welcome');
  const { styles } = useStyles();
  const { send: sendMessage } = useSendMessage();

  // 动态随机选择问题
  const selectedQuestions = useMemo(() => {
    const shuffled = shuffle([...allQuestions]);
    return shuffled.slice(0, mobile ? 2 : 5);
  }, [mobile, randomSeed]);

  const handleRefresh = () => {
    setRandomSeed(Math.floor(Math.random() * 10_000));
  };

  return (
    <Flexbox gap={8} width={'100%'}>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <div className={styles.title}>{t('guide.questions.title')}</div>
        <Flexbox gap={4} horizontal>
          <ActionIcon
            icon={RefreshCw}
            onClick={handleRefresh}
            size={{ blockSize: 24, size: 14 }}
            title={t('guide.agents.replaceBtn')}
          />
          <Link href={'https://doc.chatai.markqq.com'} target={'_blank'}>
            <ActionIcon
              icon={ArrowRight}
              size={{ blockSize: 24, size: 16 }}
              title={t('guide.questions.moreBtn')}
            />
          </Link>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={8} horizontal wrap={'wrap'}>
        {selectedQuestions.map((item) => {
          const text = t(`guide.qa.${item}` as any, { appName: BRANDING_NAME });
          return (
            <Block
              align={'center'}
              className={styles.card}
              clickable
              gap={8}
              horizontal
              key={item}
              onClick={() => {
                updateInputMessage(text);
                sendMessage({ isWelcomeQuestion: true });
              }}
              variant={'outlined'}
            >
              {text}
            </Block>
          );
        })}
      </Flexbox>
    </Flexbox>
  );
});

export default QuestionSuggest;
