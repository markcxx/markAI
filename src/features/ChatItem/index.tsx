'use client';

import { ModelIcon } from '@lobehub/icons';
import { ChatItemProps, ChatItem as ChatItemRaw } from '@lobehub/ui/chat';
import isEqual from 'fast-deep-equal';
import { memo, useMemo } from 'react';

import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

const ChatItem = memo<ChatItemProps>(({ markdownProps = {}, avatar, ...rest }) => {
  const { componentProps, ...restMarkdown } = markdownProps;
  const { general } = useUserStore(settingsSelectors.currentSettings, isEqual);

  // 处理模型头像
  const processedAvatar = useMemo(() => {
    // 检查avatar是否为MetaData对象且包含avatar属性
    if (
      avatar &&
      typeof avatar === 'object' &&
      'avatar' in avatar &&
      typeof avatar.avatar === 'string'
    ) {
      const avatarStr = avatar.avatar;
      if (avatarStr.startsWith('model-icon:')) {
        const modelId = avatarStr.replace('model-icon:', '');
        return {
          ...avatar,
          avatar: <ModelIcon model={modelId} size={30} />,
        };
      }
    }
    return avatar;
  }, [avatar]);

  return (
    <ChatItemRaw
      avatar={processedAvatar}
      fontSize={general.fontSize}
      markdownProps={{
        ...restMarkdown,
        componentProps: {
          ...componentProps,
          highlight: {
            theme: general.highlighterTheme,
            ...componentProps?.highlight,
          },
          mermaid: {
            theme: general.mermaidTheme,
            ...componentProps?.mermaid,
          },
        },
      }}
      {...rest}
    />
  );
});

export default ChatItem;
