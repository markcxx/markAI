import { ActionIcon, Select, type SelectProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { LucideChevronDown, LucideChevronRight } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelItemRender, ProviderItemRender, TAG_CLASSNAME } from '@/components/ModelSelect';
import { useEnabledChatModels } from '@/hooks/useEnabledChatModels';
import { EnabledProviderWithModels } from '@/types/aiProvider';

const useStyles = createStyles(({ css, prefixCls }) => ({
  collapseIcon: css`
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.1);
    }
  `,
  popup: css`
    &.${prefixCls}-select-dropdown .${prefixCls}-select-item-option-grouped {
      padding-inline-start: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `,
  select: css`
    .${prefixCls}-select-selection-item {
      .${TAG_CLASSNAME} {
        display: none;
      }
    }
  `,
}));

interface ModelOption {
  label: any;
  provider: string;
  value: string;
}

interface ModelSelectProps {
  defaultValue?: { model: string; provider?: string };
  onChange?: (props: { model: string; provider: string }) => void;
  showAbility?: boolean;
  value?: { model: string; provider?: string };
}

const ModelSelect = memo<ModelSelectProps>(({ value, onChange, showAbility = true }) => {
  const enabledList = useEnabledChatModels();
  const { t } = useTranslation('components');
  const { styles } = useStyles();

  // 管理每个provider的折叠状态，默认只展开当前选择模型的服务商
  const [collapsedProviders, setCollapsedProviders] = useState<Set<string>>(() => {
    const allProviders = new Set(enabledList.map((p) => p.id));
    // 移除当前选择的provider，让它保持展开状态
    if (value?.provider) {
      allProviders.delete(value.provider);
    }
    return allProviders;
  });

  const toggleProviderCollapse = (providerId: string) => {
    setCollapsedProviders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(providerId)) {
        newSet.delete(providerId);
      } else {
        newSet.add(providerId);
      }
      return newSet;
    });
  };

  const options = useMemo<SelectProps['options']>(() => {
    const getChatModels = (provider: EnabledProviderWithModels) =>
      provider.children.map((model) => ({
        label: (
          <ModelItemRender
            {...model}
            {...model.abilities}
            provider={provider.id}
            showInfoTag={showAbility}
          />
        ),
        provider: provider.id,
        value: `${provider.id}/${model.id}`,
      }));

    if (enabledList.length === 1) {
      const provider = enabledList[0];

      return getChatModels(provider);
    }

    return enabledList.map((provider) => {
      const isCollapsed = collapsedProviders.has(provider.id);
      return {
        label: (
          <Flexbox align="center" gap={4} horizontal>
            <ActionIcon
              className={styles.collapseIcon}
              icon={isCollapsed ? LucideChevronRight : LucideChevronDown}
              onClick={(e) => {
                e.stopPropagation();
                toggleProviderCollapse(provider.id);
              }}
              size={'small'}
              title={isCollapsed ? t('ModelSwitchPanel.expand') : t('ModelSwitchPanel.collapse')}
              tooltipProps={{
                mouseEnterDelay: 0.5,
                mouseLeaveDelay: 0.1,
                placement: 'top',
              }}
            />
            <ProviderItemRender
              logo={provider.logo}
              name={provider.name}
              provider={provider.id}
              source={provider.source}
            />
          </Flexbox>
        ),
        options: isCollapsed ? [] : getChatModels(provider),
      };
    });
  }, [enabledList, collapsedProviders, showAbility, t]);

  return (
    <Select
      className={styles.select}
      classNames={{
        popup: { root: styles.popup },
      }}
      defaultValue={`${value?.provider}/${value?.model}`}
      onChange={(value, option) => {
        const model = value.split('/').slice(1).join('/');
        onChange?.({ model, provider: (option as unknown as ModelOption).provider });
      }}
      options={options}
      popupMatchSelectWidth={false}
      value={`${value?.provider}/${value?.model}`}
    />
  );
});

export default ModelSelect;
