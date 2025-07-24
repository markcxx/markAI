import { ActionIcon, ActionIconProps } from '@lobehub/ui';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 36,
  size: 20,
  strokeWidth: 1.5,
};

const BottomActions = memo(() => {
  const { hideGitHub } = useServerConfigStore(featureFlagsSelectors);

  return (
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
    </Flexbox>
  );
});

export default BottomActions;
