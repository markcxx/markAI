import { ActionIcon, ActionIconProps } from '@lobehub/ui';
import { BookOpen, Github, Newspaper, User } from 'lucide-react';
import Link from 'next/link';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AIDailyPanel from '@/components/AIDailyPanel';
import DeveloperPanel from '@/components/DeveloperPanel';
import { DEVELOPER_LINKS } from '@/const/branding';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 36,
  size: 20,
  strokeWidth: 1.5,
};

const BottomActions = memo(() => {
  const { hideGitHub } = useServerConfigStore(featureFlagsSelectors);
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [showDailyPanel, setShowDailyPanel] = useState(false);

  return (
    <>
      <Flexbox gap={8}>
        {!hideGitHub && (
          <Link aria-label={'GitHub'} href={DEVELOPER_LINKS.github} target={'_blank'}>
            <ActionIcon
              icon={Github}
              size={ICON_SIZE}
              title={'GitHub'}
              tooltipProps={{ placement: 'right' }}
            />
          </Link>
        )}
        <Link aria-label={'文档'} href={'https://doc.chatai.markqq.com'} target={'_blank'}>
          <ActionIcon
            icon={BookOpen}
            size={ICON_SIZE}
            title={'文档'}
            tooltipProps={{ placement: 'right' }}
          />
        </Link>
        <ActionIcon
          icon={Newspaper}
          onClick={() => setShowDailyPanel(true)}
          size={ICON_SIZE}
          title={'每日AI日报'}
          tooltipProps={{ placement: 'right' }}
        />
        <ActionIcon
          icon={User}
          onClick={() => setShowDeveloperPanel(true)}
          size={ICON_SIZE}
          title={'开发者信息'}
          tooltipProps={{ placement: 'right' }}
        />
      </Flexbox>
      <DeveloperPanel onClose={() => setShowDeveloperPanel(false)} open={showDeveloperPanel} />
      <AIDailyPanel onClose={() => setShowDailyPanel(false)} open={showDailyPanel} />
    </>
  );
});

export default BottomActions;
