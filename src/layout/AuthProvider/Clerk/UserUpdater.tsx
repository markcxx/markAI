'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { memo, useEffect } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useUserStore } from '@/store/user';
import { LobeUser } from '@/types/user';

// update the user data into the context
const UserUpdater = memo(() => {
  const { isLoaded, user, isSignedIn } = useUser();

  const { session, openUserProfile, signOut, openSignIn } = useClerk();

  const useStoreUpdater = createStoreUpdater(useUserStore);

  useStoreUpdater('isLoaded', isLoaded);
  useStoreUpdater('isSignedIn', isSignedIn);
  useStoreUpdater('clerkUser', user || undefined);
  useStoreUpdater('clerkSession', session?.status === 'active' ? session : undefined);
  useStoreUpdater('clerkSignIn', openSignIn);
  useStoreUpdater('clerkOpenUserProfile', openUserProfile);
  useStoreUpdater('clerkSignOut', signOut);

  // 监听用户状态和初始化状态，同步用户数据
  const isUserStateInit = useUserStore((s) => s.isUserStateInit);
  useEffect(() => {
    if (user) {
      const currentState = useUserStore.getState();
      const userAvatar = currentState.user?.avatar;

      const lobeUser = {
        // 如果用户状态已初始化且有自定义头像，优先使用自定义头像
        // 否则使用 Clerk 提供的头像
        avatar: isUserStateInit && userAvatar ? userAvatar : user?.imageUrl || '',
        firstName: user?.firstName,
        fullName: user?.fullName,
        id: user?.id,
        latestName: user?.lastName,
        username: user?.username,
      } as LobeUser;

      // 更新用户相关数据
      useUserStore.setState({ user: lobeUser });
    }
  }, [user, isUserStateInit]);

  return null;
});

export default UserUpdater;
