'use client';

import { ActionIcon, Avatar, Dropdown, type MenuProps } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import { Users } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { DEFAULT_USER_AVATAR_URL } from '@/const/meta';
import { lambdaQuery } from '@/libs/trpc/client/lambda';

const maskEmail = (email?: string | null) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = Math.min(2, local.length);
  const hiddenCount = Math.max(local.length - visible, 0);
  const maskedLocal = `${local.slice(0, visible)}${hiddenCount > 0 ? '*'.repeat(4) : ''}`;
  return `${maskedLocal}@${domain}`;
};

const UserDirectoryButton = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('common');
  const { mobile: resMobile } = useResponsive();

  const { data: users } = lambdaQuery.user.listPublicUsers.useQuery(void 0, {
    staleTime: 30 * 1000,
  });

  const items = useMemo<MenuProps['items']>(() => {
    return (users || []).map((u) => ({
      icon: (
        <Center style={{ minWidth: 24 }}>
          <Avatar
            alt={u.username || t('userPanel.anonymousNickName')}
            avatar={u.avatar || DEFAULT_USER_AVATAR_URL}
            size={24}
          />
        </Center>
      ),
      key: u.id,
      label: (
        <Flexbox gap={2}>
          <div style={{ fontWeight: 500 }}>{u.username || t('userPanel.anonymousNickName')}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
            {maskEmail(u.email)}
          </div>
        </Flexbox>
      ),
    }));
  }, [users, t]);

  return (
    <Dropdown menu={{ items }} trigger={['hover', 'click']}>
      <ActionIcon
        icon={Users}
        size={mobile || resMobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
        title={'用户'}
        tooltipProps={{ placement: 'bottom' }}
      />
    </Dropdown>
  );
});

export default UserDirectoryButton;
