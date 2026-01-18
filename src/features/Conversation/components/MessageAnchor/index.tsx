import { Icon } from '@lobehub/ui';
import { Tooltip } from 'antd';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { memo, useEffect, useRef } from 'react';

import AnchorItem from './AnchorItem';
import { useStyles } from './style';

interface MessageAnchorProps {
  activeIndex: number;
  data: string[];
  onScrollTo: (index: number) => void;
}

const MessageAnchor = memo<MessageAnchorProps>(({ data, activeIndex, onScrollTo }) => {
  const { styles } = useStyles();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the anchor list to keep active anchor in view
  useEffect(() => {
    if (scrollRef.current && activeIndex >= 0) {
      const activeEl = scrollRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      onScrollTo(activeIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex < data.length - 1) {
      onScrollTo(activeIndex + 1);
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className={styles.container}>
      <Tooltip placement="left" title="上一条消息">
        <div className={styles.button} onClick={handlePrev}>
          <Icon icon={ArrowUp} size={16} />
        </div>
      </Tooltip>

      <div className={styles.scrollTrack} ref={scrollRef}>
        {data.map((id, index) => (
          <div data-index={index} key={id}>
            <AnchorItem
              id={id}
              index={index}
              isActive={index === activeIndex}
              onClick={onScrollTo}
            />
          </div>
        ))}
      </div>

      <Tooltip placement="left" title="下一条消息">
        <div className={styles.button} onClick={handleNext}>
          <Icon icon={ArrowDown} size={16} />
        </div>
      </Tooltip>
    </div>
  );
});

export default MessageAnchor;
