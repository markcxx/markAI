import { ProviderCombine, ProviderIcon } from '@lobehub/icons';
import { Avatar, Text } from '@lobehub/ui';
import { Divider, Skeleton } from 'antd';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { AiProviderListItem } from '@/types/aiProvider';

import EnableSwitch from './EnableSwitch';
import { useStyles } from './style';

interface ProviderCardProps extends AiProviderListItem {
  loading?: boolean;
}
const ProviderCard = memo<ProviderCardProps>(
  ({ id, description, name, enabled, source, logo, loading }) => {
    const { t } = useTranslation('providers');
    const { cx, styles, theme } = useStyles();

    if (loading)
      return (
        <Flexbox className={cx(styles.container)} gap={24} padding={16}>
          <Skeleton active />
        </Flexbox>
      );

    /* ↓ cloud slot ↓ */

    /* ↑ cloud slot ↑ */

    return (
      <Flexbox className={cx(styles.container)} gap={24}>
        <Flexbox gap={12} padding={16} width={'100%'}>
          <Link href={`/settings/provider/${id}`}>
            <Flexbox gap={12} width={'100%'}>
              <Flexbox align={'center'} horizontal justify={'space-between'}>
                {source === 'builtin' ? (
                  // Special handling for markai provider to use custom logo
                  id === 'markai' ? (
                    <Flexbox align={'center'} gap={12} horizontal>
                      <Avatar alt={name || id} avatar={'/icons/LOGO.png'} size={28} />
                      <Text strong>{name}</Text>
                    </Flexbox>
                  ) : (
                    <ProviderCombine
                      provider={id}
                      size={24}
                      style={{ color: theme.colorText }}
                      title={name}
                    />
                  )
                ) : (
                  <Flexbox align={'center'} gap={12} horizontal>
                    {logo ? (
                      <Avatar alt={name || id} avatar={logo} size={28} />
                    ) : (
                      <ProviderIcon
                        provider={id}
                        size={24}
                        style={{ borderRadius: 6 }}
                        type={'avatar'}
                      />
                    )}
                    <Text strong>{name}</Text>
                  </Flexbox>
                )}
                <EnableSwitch enabled={enabled} id={id} />
              </Flexbox>
              <Text className={styles.desc} type={'secondary'}>
                {t(`${id}.description`)}
              </Text>
            </Flexbox>
          </Link>
        </Flexbox>
        <Divider style={{ margin: 0 }} />
        <Flexbox gap={12} padding={16} width={'100%'}>
          {/* cloud slot */}

          {/* cloud slot */}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ProviderCard;
