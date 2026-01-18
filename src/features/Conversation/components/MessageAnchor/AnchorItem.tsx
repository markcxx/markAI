import { Tooltip } from 'antd';
import { cx } from 'antd-style';
import React, { memo } from 'react';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';

import { useStyles } from './style';

interface AnchorItemProps {
  id: string;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const AnchorItem = memo<AnchorItemProps>(({ id, index, isActive, onClick }) => {
  const { styles } = useStyles();

  // We only fetch the content for the tooltip.
  // Using a selector that extracts content string to minimize re-renders.
  // Note: This might still trigger re-renders if the message object reference changes.
  const content = useChatStore((s) => {
    const message = chatSelectors.getMessageById(id)(s);
    return message?.content || '';
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(index);
  };

  return (
    <Tooltip
      mouseEnterDelay={0.2}
      placement="left"
      title={
        <div className={styles.tooltip}>
          {content.slice(0, 100) + (content.length > 100 ? '...' : '')}
        </div>
      }
    >
      <div className={cx(styles.anchor, isActive && styles.active)} onClick={handleClick} />
    </Tooltip>
  );
});

export default AnchorItem;
