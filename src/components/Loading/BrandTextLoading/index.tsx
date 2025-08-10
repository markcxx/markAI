import { BrandLoading, LobeHubText } from '@lobehub/ui/brand';
import { Center } from 'react-layout-kit';

import { isCustomBranding } from '@/const/version';

import MarkAIText from './MarkAIText';

export default () => {
  if (isCustomBranding) {
    return (
      <Center height={'100%'} width={'100%'}>
        <div style={{ height: 40, opacity: 0.6, width: 120 }}>
          <MarkAIText />
        </div>
      </Center>
    );
  }

  return (
    <Center height={'100%'} width={'100%'}>
      <BrandLoading size={40} style={{ opacity: 0.6 }} text={LobeHubText} />
    </Center>
  );
};
