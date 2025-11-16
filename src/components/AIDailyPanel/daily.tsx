'use client';

import { Progress } from 'antd';
import { createStyles } from 'antd-style';
import { ArrowUp, LinkIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

const PROGRESS_HEIGHT = 2;

const useStyles = createStyles(({ css, token }) => ({
  backTop: css`
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border: 1px solid ${token.colorBorder};
    border-radius: 20px;

    color: ${token.colorTextSecondary};

    background: ${token.colorBgElevated};

    &:hover {
      color: ${token.colorText};
    }
  `,
  container: css`
    position: relative;
    overflow: hidden;
    height: 100vh;
    background: ${token.colorBgContainer};
  `,
  content: css`
    max-width: 900px;
    margin-inline: auto;
  `,
  floatTools: css`
    position: fixed;
    inset-block-end: 24px;
    inset-inline-end: 24px;

    display: flex;
    gap: 12px;
    align-items: center;
  `,
  footer: css`
    margin-block-start: 24px;
    padding-block: 16px 20px;
    padding-inline: 16px;
    border: 1px solid ${token.colorBorder};
    border-radius: 12px;

    background: ${token.colorBgElevated};
  `,
  footerLink: css`
    position: relative;

    display: inline-flex;
    gap: 6px;
    align-items: center;

    font-weight: 600;
    color: ${token.colorPrimary};
    text-decoration: none;

    &::after {
      content: '';

      position: absolute;
      inset-block-end: -1px;
      inset-inline-start: 0;

      width: 0;
      height: 2px;

      background: ${token.colorPrimary};

      transition: width 220ms ease;
    }

    &:hover::after {
      width: 100%;
    }
  `,
  history: css`
    position: fixed;
    inset-block-start: 64px;
    inset-inline-start: 24px;

    overflow: auto;

    width: 260px;
    max-height: calc(100vh - 120px);
    padding: 12px;
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    background: ${token.colorBgElevated};
  `,
  historyActive: css`
    border-inline-start-color: ${token.colorPrimary};
    color: ${token.colorText};
  `,
  historyItem: css`
    cursor: pointer;

    display: block;

    padding-block: 8px;
    padding-inline: 10px;
    border-inline-start: 3px solid transparent;

    color: ${token.colorTextSecondary};
    text-decoration: none;

    &:hover {
      color: ${token.colorText};
    }
  `,
  html: css`
    font-size: 15px;
    line-height: 1.8;
    color: ${token.colorText};

    & h1,
    & h2,
    & h3 {
      margin-block: 16px;
      margin-inline: 0;
    }

    & p {
      margin-block: 12px;
      margin-inline: 0;
    }

    & code {
      padding-block: 2px;
      padding-inline: 6px;
      border-radius: 4px;
      background: ${token.colorFillTertiary};
    }

    & pre {
      overflow: auto;
      padding: 12px;
      border-radius: 8px;
      background: ${token.colorFillQuaternary};
    }

    & blockquote {
      padding-inline-start: 12px;
      border-inline-start: 3px solid ${token.colorBorder};
      color: ${token.colorTextSecondary};
    }

    & ul,
    & ol {
      padding-inline-start: 20px;
    }

    & a {
      position: relative;

      display: inline-block;

      font-weight: 600;
      color: ${token.colorPrimary};
      text-decoration: none;
      vertical-align: baseline;
    }

    & a::after {
      content: '';

      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;

      width: 0;
      height: 2px;

      background: ${token.colorPrimary};

      transition: width 220ms ease;
    }

    & a:hover::after {
      width: 100%;
    }

    & strong {
      font-weight: 600;
    }

    & img {
      display: block;

      width: 100% !important;
      height: auto !important;
      max-height: 420px;
      margin-block: 12px;
      margin-inline: auto;

      object-fit: contain;
    }

    & video {
      width: 100% !important;
      border-radius: 8px;
    }

    & table {
      border-collapse: collapse;
      width: 100%;
    }

    & table img {
      width: 100% !important;
      height: auto !important;
      max-height: 180px;
      object-fit: contain;
    }
  `,
  link: css`
    display: inline-flex;
    gap: 6px;
    align-items: center;

    color: ${token.colorTextSecondary};
    text-decoration: none;

    &:hover {
      color: ${token.colorText};
    }
  `,
  scroll: css`
    overflow-y: auto;
    height: 100%;
    padding: 24px;
  `,
  titleBar: css`
    position: sticky;
    z-index: 99;
    inset-block-start: ${PROGRESS_HEIGHT}px;

    display: flex;
    gap: 12px;
    align-items: center;

    padding-block: 12px;

    background: ${token.colorBgContainer};
  `,
  toc: css`
    position: fixed;
    inset-block-start: 64px;
    inset-inline-end: 24px;

    overflow: auto;

    width: 260px;
    max-height: calc(100vh - 120px);
    padding: 12px;
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    background: ${token.colorBgElevated};
  `,
  tocActive: css`
    border-inline-start-color: ${token.colorPrimary};
    color: ${token.colorText};
  `,
  tocItem: css`
    cursor: pointer;

    display: block;

    padding-block: 6px;
    padding-inline: 8px;
    border-inline-start: 3px solid transparent;

    color: ${token.colorTextSecondary};
    text-decoration: none;

    &:hover {
      color: ${token.colorText};
    }
  `,
  topProgress: css`
    position: sticky;
    z-index: 100;
    inset-block-start: 0;
  `,
}));

interface FeedItem {
  content: string;
  link: string;
  pubDate?: string;
  title: string;
}

const sanitizeHTML = (html: string) => {
  if (typeof document === 'undefined') return html || '';
  const d = document.createElement('div');
  d.innerHTML = html || '';
  d.querySelectorAll('blockquote').forEach((bq) => {
    const t = bq.textContent || '';
    if (
      /AI资讯|每日早读|全网数据聚合|前沿科学探索|行业自由发声|开源创新力量|AI与人类未来|访问网页版|进群交流/.test(
        t,
      )
    )
      bq.remove();
  });
  d.querySelectorAll('h2').forEach((h2) => {
    const t = h2.textContent || '';
    if (t.includes('AI资讯日报语音版')) {
      const next = h2.nextElementSibling;
      if (next && next.tagName === 'TABLE') next.remove();
      h2.remove();
    }
  });
  return d.innerHTML;
};

export default function DailyContent() {
  const { styles } = useStyles();
  const [item, setItem] = useState<FeedItem | null>(null);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [percent, setPercent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; level: number; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<number | null>(null);
  const tocSigRef = useRef<string>('');

  const getScrollEl = () => {
    const el = scrollRef.current;
    if (el && el.scrollHeight - el.clientHeight > 5) return el;
    return (document.scrollingElement || document.documentElement) as HTMLElement;
  };
  const onRecalc = () => {
    const el = getScrollEl();
    const isWindow = el === document.scrollingElement || el === document.documentElement;
    let max = 0;
    let current = 0;
    if (isWindow) {
      const s = (document.scrollingElement || document.documentElement) as HTMLElement;
      max = Math.max(0, s.scrollHeight - window.innerHeight);
      current = window.scrollY || (s as any).scrollTop || 0;
    } else {
      max = Math.max(0, el.scrollHeight - el.clientHeight);
      current = el.scrollTop;
    }
    const p = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
    setPercent(p);
  };

  const buildTOC = () => {
    const holder = scrollRef.current;
    if (!holder) return;
    const htmlRoot = holder.querySelector(`.${styles.html}`) as HTMLElement | null;
    if (!htmlRoot) return;
    const headings = Array.from(htmlRoot.querySelectorAll('h1,h2,h3,h4')) as HTMLElement[];
    const used = new Set<string>();
    const slug = (s: string) => {
      let base = s
        .toLowerCase()
        .trim()
        .replaceAll(/[^\da-z\u4E00-\u9FA5]+/g, '-')
        .replaceAll(/^-+|-+$/g, '');
      if (!base) base = 'section';
      let t = base;
      let i = 2;
      while (used.has(t)) {
        t = `${base}-${i}`;
        i += 1;
      }
      used.add(t);
      return t;
    };
    const list: { id: string; level: number; text: string }[] = [];
    headings.forEach((h) => {
      const text = (h.textContent || '').trim();
      if (!text) return;
      const level = h.tagName === 'H1' ? 1 : h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : 4;
      let id = h.getAttribute('id') || '';
      if (!id) {
        id = slug(text);
        h.setAttribute('id', id);
      }
      list.push({ id, level, text });
    });
    const sig = list.map((x) => x.id).join('|');
    if (sig !== tocSigRef.current) {
      tocSigRef.current = sig;
      setToc(list);
    }
  };

  useEffect(() => {
    const url =
      'https://api.rss2json.com/v1/api.json?rss_url=https://justlovemaki.github.io/CloudFlare-AI-Insight-Daily/rss.xml';
    fetch(url, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const arr = data?.items || [];
        const mapped: FeedItem[] = arr.map((it: any) => ({
          content: sanitizeHTML(it?.content || ''),
          link: it?.link || '',
          pubDate: it?.pubDate || '',
          title: it?.title || '',
        }));
        setItems(mapped);
        setItem(mapped[0] || null);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const holder = scrollRef.current;
    if (!holder) return;
    const htmlRoot = holder.querySelector(`.${styles.html}`) as HTMLElement | null;
    if (!htmlRoot) return;
    buildTOC();
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    const el = getScrollEl();
    const isWindow = el === document.scrollingElement || el === document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        let best: { id: string; ratio: number } | null = null;
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).getAttribute('id') || '';
          if (!id) return;
          if (e.isIntersecting) {
            const r = e.intersectionRatio;
            if (!best || r > best.ratio) best = { id, ratio: r };
          }
        });
        if (best) setActiveId((prev) => (prev === best!.id ? prev : best!.id));
      },
      {
        root: isWindow ? null : (el as Element),
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    observerRef.current = io;
    Array.from(htmlRoot.querySelectorAll('h1,h2,h3,h4')).forEach((h) => io.observe(h));
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
  }, [item]);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(onRecalc);
    onRecalc();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', onScroll, { passive: true } as any);
    const holder = scrollRef.current;
    const scheduleUpdate = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        onRecalc();
        buildTOC();
      }, 80);
    };
    const mo = holder
      ? new MutationObserver(() => {
          scheduleUpdate();
        })
      : null;
    const htmlRoot = holder
      ? (holder.querySelector(`.${styles.html}`) as HTMLElement | null)
      : null;
    if (htmlRoot && mo) mo.observe(htmlRoot, { childList: true, subtree: true });
    const imgs = htmlRoot ? htmlRoot.querySelectorAll('img, video') : [];
    const onMediaLoad = () => scheduleUpdate();
    imgs.forEach((m) => m.addEventListener('load', onMediaLoad));
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (el) el.removeEventListener('scroll', onScroll);
      if (mo) mo.disconnect();
      imgs.forEach((m) => m.removeEventListener('load', onMediaLoad));
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scroll} ref={scrollRef}>
        <Flexbox className={styles.titleBar} gap={8} horizontal>
          <a
            className={styles.link}
            href={item?.link}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            <LinkIcon size={16} />
            {item?.title || '每日AI日报'}
          </a>
          {item?.pubDate && (
            <span style={{ color: 'var(--ant-colorTextTertiary)' }}>{item.pubDate}</span>
          )}
        </Flexbox>
        <div className={styles.topProgress}>
          <Progress percent={percent} showInfo={false} size={'small'} style={{ margin: 0 }} />
        </div>
        <div className={styles.content}>
          {item && (
            <div className={styles.html} dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
          <div className={styles.footer}>
            <Flexbox gap={4}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>MarkAI · AI资讯日报</div>
              <div style={{ color: 'var(--ant-colorTextTertiary)' }}>
                左侧可切换历史期刊；订阅与内容由本站提供。
              </div>
            </Flexbox>
          </div>
        </div>
      </div>

      <div className={styles.floatTools}>
        <Progress percent={percent} size={40} type={'circle'} />
        <button
          aria-label={'Back to Top'}
          className={styles.backTop}
          onClick={() => {
            const el = getScrollEl();
            if (el === document.scrollingElement || el === document.documentElement) {
              window.scrollTo({ behavior: 'smooth', top: 0 });
            } else {
              el.scrollTo({ behavior: 'smooth', top: 0 });
            }
          }}
          type={'button'}
        >
          <ArrowUp size={18} />
        </button>
      </div>
      {items.length > 0 && (
        <div className={styles.history}>
          {items.map((it, idx) => (
            <div
              className={`${styles.historyItem} ${item?.link === it.link ? styles.historyActive : ''}`}
              key={it.link + idx}
              onClick={() => {
                setItem(it);
                const el = getScrollEl();
                if (el === document.scrollingElement || el === document.documentElement) {
                  window.scrollTo({ behavior: 'smooth', top: 0 });
                } else {
                  el.scrollTo({ behavior: 'smooth', top: 0 });
                }
              }}
            >
              {it.title}
            </div>
          ))}
        </div>
      )}
      {toc.length > 0 && (
        <div className={styles.toc}>
          {toc.map((t) => (
            <div
              className={`${styles.tocItem} ${activeId === t.id ? styles.tocActive : ''}`}
              key={t.id}
              style={{ marginLeft: (t.level - 1) * 12 }}
            >
              {t.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
