'use client';

import { ActionIcon } from '@lobehub/ui';
import { Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CHANGELOG_READ_STORAGE_KEY, LATEST_VERSION } from '@/changelog';
import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useWorkspaceModal } from '@/hooks/useWorkspaceModal';

const UpdateLogModal = dynamic(() => import('@/features/UpdateLogModal'));

interface UpdateLogButtonProps {
  mobile?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const UpdateLogButton = memo<UpdateLogButtonProps>(({ mobile, open, setOpen }) => {
  const { t } = useTranslation(['changelog', 'common']);
  const [isModalOpen, setIsModalOpen] = useWorkspaceModal(open, setOpen);

  useEffect(() => {
    try {
      const readVersion = localStorage.getItem(CHANGELOG_READ_STORAGE_KEY);
      if (LATEST_VERSION && readVersion !== LATEST_VERSION) {
        setIsModalOpen(true);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ActionIcon
        icon={Sparkles}
        onClick={() => setIsModalOpen(true)}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
        title={t('title')}
        tooltipProps={{ placement: 'bottom' }}
      />
      <UpdateLogModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default UpdateLogButton;
