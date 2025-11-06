import { Modal, type ModalProps } from '@lobehub/ui';
import { App, Button } from 'antd';
import { Sparkles } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import {
  CHANGELOG_READ_STORAGE_KEY,
  LATEST_VERSION,
  getAllEntries,
  getLatestEntry,
} from '@/changelog';

// Match the reference UI color mapping exactly
const typeStyleMap: Record<string, { bg: string; color: string; label: string }> = {
  feature: { bg: '#3b82f6', color: '#ffffff', label: '新功能' },
  // purple-500
  fix: { bg: '#22c55e', color: '#ffffff', label: '修复' },
  // blue-500
  improvement: { bg: '#a855f7', color: '#ffffff', label: '优化' }, // green-500
};

interface UpdateLogModalProps extends Pick<ModalProps, 'open' | 'onCancel'> {
  showAllByDefault?: boolean;
}

const UpdateLogModal = memo<UpdateLogModalProps>(({ onCancel, open, showAllByDefault }) => {
  const { t } = useTranslation(['changelog', 'common']);
  const { message } = App.useApp();

  const [showAll, setShowAll] = useState<boolean>(!!showAllByDefault);

  const latest = useMemo(() => getLatestEntry(), []);
  const all = useMemo(() => getAllEntries(), []);

  const entries = showAll ? all : latest ? [latest] : [];

  const onRead = () => {
    try {
      localStorage.setItem(CHANGELOG_READ_STORAGE_KEY, LATEST_VERSION);
      message.success(t('ok', { ns: 'common' }));
    } catch {
      void 0;
    }
    onCancel?.(undefined as any);
  };

  return (
    <Modal
      allowFullscreen
      centered
      footer={
        <Flexbox align={'center'} justify={'center'} style={{ width: '100%' }}>
          <Button onClick={onRead} size={'large'} style={{ minWidth: 200 }} type={'primary'}>
            {t('markAsRead', { defaultValue: '已读' })}
          </Button>
        </Flexbox>
      }
      onCancel={onCancel}
      open={open}
      title={t('title')}
      width={600}
    >
      {/* Header section: icon + title + version subtitle */}
      <div style={{ borderBottom: '1px solid rgba(0,0,0,0.12)', padding: 24 }}>
        <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
          <div
            style={{
              alignItems: 'center',
              background: '#3b82f6',
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'center',
              padding: 12,
            }}
          >
            <Sparkles color={'#fff'} size={24} />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>版本更新</div>
            {latest?.version && (
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginTop: 4 }}>
                版本 {latest.version} 已发布
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll area: update items list */}
      <div style={{ maxHeight: 480, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {entries.map((entry) => (
            <div key={entry.version}>
              {/* version sub-header */}
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 700 }}>版本 {entry.version}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                  {entry.date}
                </div>
              </div>
              {/* items for this version */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {entry.items.map((item, idx) => {
                  const style = typeStyleMap[item.type] || {
                    bg: 'rgba(0,0,0,0.06)',
                    color: 'var(--color-text)',
                    label: item.type,
                  };
                  return (
                    <div
                      key={`${entry.version}-${idx}`}
                      style={{
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: 8,
                        padding: 16,
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <div style={{ alignItems: 'flex-start', display: 'flex', gap: 12 }}>
                        <span
                          style={{
                            background: style.bg,
                            borderRadius: 6,
                            color: style.color,
                            fontSize: 12,
                            fontWeight: 500,
                            padding: '4px 10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {style.label}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{item.title}</div>
                          {item.description && (
                            <div
                              style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: 13,
                                lineHeight: 1.6,
                              }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <Button onClick={() => setShowAll((s) => !s)} type={'link'}>
            {showAll ? t('versionDetails') : t('allChangelog')}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default UpdateLogModal;
