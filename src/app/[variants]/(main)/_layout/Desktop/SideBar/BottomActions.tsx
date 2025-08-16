import { ActionIcon, ActionIconProps } from '@lobehub/ui';
import { BookOpen, Github, User } from 'lucide-react';
import Link from 'next/link';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import DeveloperPanel from '@/components/DeveloperPanel';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 36,
  size: 20,
  strokeWidth: 1.5,
};

const BottomActions = memo(() => {
  const { hideGitHub } = useServerConfigStore(featureFlagsSelectors);
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);

  return (
    <>
      <Flexbox gap={8}>
        {!hideGitHub && (
          <Link aria-label={'GitHub'} href={'https://github.com/markcxx'} target={'_blank'}>
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
          icon={User}
          onClick={() => setShowDeveloperPanel(true)}
          size={ICON_SIZE}
          title={'开发者信息'}
          tooltipProps={{ placement: 'right' }}
        />
      </Flexbox>
      <DeveloperPanel onClose={() => setShowDeveloperPanel(false)} open={showDeveloperPanel} />
    </>
  );
});

export default BottomActions;
