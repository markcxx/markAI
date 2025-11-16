'use client';

import { Drawer } from '@lobehub/ui';

import { isDesktop } from '@/const/version';
import { TITLE_BAR_HEIGHT } from '@/features/ElectronTitlebar';

import DailyContent from './daily';

interface AIDailyPanelProps {
  onClose: () => void;
  open: boolean;
}

export default function AIDailyPanel({ open, onClose }: AIDailyPanelProps) {
  return (
    <Drawer
      height={isDesktop ? `calc(100vh - ${TITLE_BAR_HEIGHT}px)` : '100vh'}
      noHeader
      onClose={onClose}
      open={open}
      placement={'bottom'}
    >
      <DailyContent />
    </Drawer>
  );
}
