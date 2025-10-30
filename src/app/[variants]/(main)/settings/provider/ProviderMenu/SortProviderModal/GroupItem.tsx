import { ProviderIcon } from '@lobehub/icons';
import { Avatar, SortableList } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { AiProviderListItem } from '@/types/aiProvider';

const GroupItem = memo<AiProviderListItem>(({ id, name, source, logo }) => {
  // Special handling for markai provider to use custom logo
  const shouldUseAvatar =
    (source === 'custom' && logo) || (source === 'builtin' && id === 'markai');
  const avatarSrc = source === 'custom' ? logo : '/icons/LOGO.png';

  return (
    <>
      <Flexbox gap={8} horizontal>
        {shouldUseAvatar ? (
          <Avatar
            alt={name || id}
            avatar={avatarSrc}
            shape={'square'}
            size={24}
            style={{ borderRadius: 6 }}
          />
        ) : (
          <ProviderIcon provider={id} size={24} style={{ borderRadius: 6 }} type={'avatar'} />
        )}
        {name}
      </Flexbox>
      <SortableList.DragHandle />
    </>
  );
});

export default GroupItem;
