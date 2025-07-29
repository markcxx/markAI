'use client';

import { Form, type FormGroupItemType, Input } from '@lobehub/ui';
import { Button, Skeleton, message } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { enableAuth } from '@/const/auth';
import { FORM_STYLE } from '@/const/layoutTokens';
import AvatarWithUpload from '@/features/AvatarWithUpload';
import UserAvatar from '@/features/User/UserAvatar';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

import SSOProvidersList from './features/SSOProvidersList';

const Client = memo<{ mobile?: boolean }>(({ mobile }) => {
  const [isLoginWithNextAuth, isLogin] = useUserStore((s) => [
    authSelectors.isLoginWithNextAuth(s),
    authSelectors.isLogin(s),
  ]);
  const [nickname, , userProfile, loading, updatePreference] = useUserStore((s) => [
    userProfileSelectors.nickName(s),
    userProfileSelectors.username(s),
    userProfileSelectors.userProfile(s),
    !s.isLoaded,
    s.updatePreference,
  ]);

  const [form] = Form.useForm();
  const { t } = useTranslation('auth');

  const handleSubmit = useCallback(
    async (values: any) => {
      try {
        await updatePreference({
          customNickname: values.customNickname || 'MarkAI',
        });
        message.success('用户名已保存');
      } catch {
        message.error('保存失败，请重试');
      }
    },
    [updatePreference],
  );

  if (loading)
    return (
      <Skeleton
        active
        paragraph={{ rows: 6 }}
        style={{ padding: mobile ? 16 : undefined }}
        title={false}
      />
    );

  const profile: FormGroupItemType = {
    children: [
      {
        children: enableAuth && !isLogin ? <UserAvatar /> : <AvatarWithUpload />,
        label: t('profile.avatar'),
        layout: 'horizontal',
        minWidth: undefined,
      },
      {
        children: <Input placeholder="请输入用户名" />,
        label: '用户名',
        name: 'customNickname',
      },
      {
        children: <Input disabled />,
        hidden: !isLoginWithNextAuth || !userProfile?.email,
        label: t('profile.email'),
        name: 'email',
      },
      {
        children: <SSOProvidersList />,
        hidden: !isLoginWithNextAuth,
        label: t('profile.sso.providers'),
        layout: 'vertical',
        minWidth: undefined,
      },
    ],
    title: t('tab.profile'),
  };

  return (
    <Form
      form={form}
      initialValues={{
        customNickname: nickname || 'MarkAI',
        email: userProfile?.email || '--',
      }}
      items={[profile]}
      itemsType={'group'}
      onFinish={handleSubmit}
      variant={'borderless'}
      {...FORM_STYLE}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <Button htmlType="submit" type="primary">
            保存用户名
          </Button>
        </div>
      }
    />
  );
});

export default Client;
