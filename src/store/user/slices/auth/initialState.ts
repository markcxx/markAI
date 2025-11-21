import { Session, User } from '@auth/core/types';
import { SignInProps, SignOut, UserProfileProps } from '@clerk/types';

import { LobeUser } from '@/types/user';

export interface UserAuthState {
  clerkOpenUserProfile?: (props?: UserProfileProps) => void;

  clerkSession?: unknown;
  clerkSignIn?: (props?: SignInProps) => void;
  clerkSignOut?: SignOut;
  clerkUser?: unknown;
  isLoaded?: boolean;

  isSignedIn?: boolean;
  nextSession?: Session;
  nextUser?: User;
  oAuthSSOProviders?: string[];
  user?: LobeUser;
}

export const initialAuthState: UserAuthState = {};
