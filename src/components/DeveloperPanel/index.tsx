'use client';

import { Drawer } from '@lobehub/ui';

import { isDesktop } from '@/const/version';
import { TITLE_BAR_HEIGHT } from '@/features/ElectronTitlebar';

import DeveloperProfile from './developer-profile';

interface DeveloperPanelProps {
  onClose: () => void;
  open: boolean;
}

export default function DeveloperPanel({ open, onClose }: DeveloperPanelProps) {
  return (
    <Drawer
      height={isDesktop ? `calc(100vh - ${TITLE_BAR_HEIGHT}px)` : '100vh'}
      noHeader
      onClose={onClose}
      open={open}
      placement={'bottom'}
    >
      <DeveloperProfile />
    </Drawer>
  );
}
