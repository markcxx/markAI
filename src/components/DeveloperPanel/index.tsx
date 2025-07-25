'use client';

import { Button } from '@lobehub/ui';
import { Badge } from 'antd';
import { createStyles } from 'antd-style';
import { Brain, Code, Database, Globe, X, Zap } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css, token }) => ({
  avatar: css`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  `,
  avatarContainer: css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 64px;
    height: 64px;
    border-radius: 50%;
  `,
  card: css`
    width: 100%;
    border: 0;
    border-radius: 16px 16px 0 0;

    background: ${token.colorBgContainer};
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 15%);
  `,
  closeButton: css`
    position: absolute;
    inset-block-start: 16px;
    inset-inline-end: 16px;

    width: 32px;
    height: 32px;
    padding: 0;
    border: none;

    background: transparent;
    box-shadow: none;

    &:hover {
      background: ${token.colorFillSecondary};
    }
  `,
  content: css`
    padding-block: 0 32px;
padding-inline: 24px;
  `,
  description: css`
    margin-block-start: 4px;
    color: ${token.colorTextSecondary};
  `,
  footer: css`
    padding-block-start: 16px;
    border-block-start: 1px solid ${token.colorBorderSecondary};
    text-align: center;
  `,
  footerText: css`
    font-size: 14px;
    color: ${token.colorTextSecondary};
  `,
  header: css`
    position: relative;
    padding: 24px;
    padding-block-end: 16px;
  `,
  link: css`
    color: ${token.colorPrimary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  linkContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
  linkItem: css`
    padding-block: 8px;
    padding-inline: 16px;
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    color: ${token.colorTextSecondary};
    text-decoration: none;

    background: ${token.colorBgContainer};

    transition: all 0.2s ease;

    &:hover {
      border-color: ${token.colorPrimary};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 10%);
    }
  `,
  linkText: css`
    font-size: 14px;

    &:hover {
      color: ${token.colorPrimary};
    }
  `,
  overlay: css`
    position: fixed;
    z-index: 40;
    inset: 0;
    background: rgba(0, 0, 0, 50%);
  `,
  panel: css`
    position: fixed;
    z-index: 50;
    inset-block-end: 0;
    inset-inline: 0 0;

    animation: slide-in-from-bottom 0.3s ease-out;

    @keyframes slide-in-from-bottom {
      from {
        transform: translateY(100%);
      }

      to {
        transform: translateY(0);
      }
    }
  `,
  projectCard: css`
    padding: 16px;
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;
    transition: all 0.2s ease;
  `,
  projectCardGreen: css`
    border-color: ${token.green3};
    background: linear-gradient(to right, ${token.green1}, ${token.cyan1});
  `,
  projectCardPurple: css`
    border-color: ${token.purple3};
    background: linear-gradient(to right, ${token.purple1}, ${token.magenta1});
  `,
  projectContainer: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  projectDesc: css`
    font-size: 14px;
    color: ${token.colorTextSecondary};
  `,
  projectTitle: css`
    margin-block-end: 8px;
    font-weight: 600;
  `,
  projectTitleGreen: css`
    color: ${token.green8};
  `,
  projectTitlePurple: css`
    color: ${token.purple8};
  `,
  section: css`
    margin-block-end: 24px;
  `,
  sectionHeader: css`
    display: flex;
    align-items: center;
    margin-block-end: 12px;
  `,
  sectionTitle: css`
    margin-inline-start: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${token.colorTextHeading};
  `,
  skillBadge: css`
    padding-block: 4px;
    padding-inline: 12px;
    border-color: ${token.purple3};
    color: ${token.purple7};

    &:hover {
      background: ${token.purple1};
    }
  `,
  skillGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,
  skillIcon: css`
    margin-inline-end: 8px;
  `,
  skillItem: css`
    display: flex;
    align-items: center;

    padding: 12px;
    border-radius: 8px;

    background: ${token.colorFillAlter};
  `,
  skillText: css`
    font-size: 14px;
    color: ${token.colorTextSecondary};
  `,
  techGrid: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  techItem: css`
    padding-block: 6px;
    padding-inline: 12px;
    border: 1px solid ${token.blue3};
    border-radius: 6px;

    background: linear-gradient(to right, ${token.blue1}, ${token.geekblue1});

    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(to right, ${token.blue2}, ${token.geekblue2});
    }
  `,
  techText: css`
    font-size: 14px;
    font-weight: 500;
    color: ${token.blue8};
  `,
  title: css`
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${token.colorTextHeading};
  `,
}));

interface DeveloperPanelProps {
  onClose: () => void;
  open: boolean;
}

export default function DeveloperPanel({ open, onClose }: DeveloperPanelProps) {
  const { styles } = useStyles();

  const techStack = [
    'React',
    'Qt',
    'PyQt',
    'FastAPI',
    'Electron',
    'TypeScript',
    'JavaScript',
    'Python',
    'Node.js',
    'Vue.js',
  ];

  const skills = ['MCP', 'RAG', '大模型开发', '语料训练', '模型微调', 'AI应用开发'];

  if (!open) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div className={styles.overlay} onClick={onClose} />

      {/* 从底部弹出的面板 */}
      <div className={styles.panel}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Button className={styles.closeButton} onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>

            <Flexbox align="center" gap={16} horizontal>
              <div className={styles.avatarContainer}>
                <img alt="怪兽马尔克" className={styles.avatar} src="/images/mark.jpg" />
              </div>
              <Flexbox>
                <h2 className={styles.title}>怪兽马尔克</h2>
                <Flexbox align="center" className={styles.description} gap={16} horizontal>
                  <Flexbox align="center" gap={4} horizontal>
                    <Globe size={16} />
                    <a className={styles.link} href="#">
                      个人博客
                    </a>
                  </Flexbox>
                  <Flexbox align="center" gap={4} horizontal>
                    <svg fill="currentColor" height={16} viewBox="0 0 24 24" width={16}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <a
                      className={styles.link}
                      href="https://github.com/markcxx"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </div>

          <div className={styles.content}>
            {/* 技术栈 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Code size={20} style={{ color: '#1890ff' }} />
                <h3 className={styles.sectionTitle}>技术栈</h3>
              </div>
              <div className={styles.techGrid}>
                {techStack.map((tech, index) => (
                  <div className={styles.techItem} key={index}>
                    <span className={styles.techText}>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 专业技能 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Brain size={20} style={{ color: '#722ed1' }} />
                <h3 className={styles.sectionTitle}>技能</h3>
              </div>
              <Flexbox gap={8} horizontal wrap={'wrap'}>
                {skills.map((skill, index) => (
                  <Badge className={styles.skillBadge} key={index}>
                    {skill}
                  </Badge>
                ))}
              </Flexbox>
            </div>

            {/* 项目作品 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Code size={20} style={{ color: '#52c41a' }} />
                <h3 className={styles.sectionTitle}>项目作品</h3>
              </div>
              <div className={styles.projectContainer}>
                <div className={`${styles.projectCard} ${styles.projectCardGreen}`}>
                  <h4 className={`${styles.projectTitle} ${styles.projectTitleGreen}`}>
                    CoCoMusic
                  </h4>
                  <p className={styles.projectDesc}>
                    集合多平台（网易云音乐、酷狗音乐等）的免付费音乐平台桌面软件，为用户提供统一的音乐播放体验。
                  </p>
                </div>
                <div className={`${styles.projectCard} ${styles.projectCardPurple}`}>
                  <h4 className={`${styles.projectTitle} ${styles.projectTitlePurple}`}>
                    VidFlowDesktop
                  </h4>
                  <p className={styles.projectDesc}>
                    专门设计的多平台视频下载工具，支持抖音、B站等平台，提供桌面软件和网页端双重体验。
                  </p>
                </div>
              </div>
            </div>

            {/* 友情链接 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Globe size={20} style={{ color: '#1890ff' }} />
                <h3 className={styles.sectionTitle}>友情链接</h3>
              </div>
              <div className={styles.linkContainer}>
                <a className={styles.linkItem} href="#">
                  <span className={styles.linkText}>CoCoMusic 官网</span>
                </a>
                <a className={styles.linkItem} href="#">
                  <span className={styles.linkText}>VidFlowDesktop 官网</span>
                </a>
              </div>
            </div>

            {/* 专长领域 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Zap size={20} style={{ color: '#fa8c16' }} />
                <h3 className={styles.sectionTitle}>专长领域</h3>
              </div>
              <div className={styles.skillGrid}>
                <div className={styles.skillItem}>
                  <Database className={styles.skillIcon} size={16} style={{ color: '#52c41a' }} />
                  <span className={styles.skillText}>大模型开发与应用</span>
                </div>
                <div className={styles.skillItem}>
                  <Brain className={styles.skillIcon} size={16} style={{ color: '#1890ff' }} />
                  <span className={styles.skillText}>RAG系统构建</span>
                </div>
                <div className={styles.skillItem}>
                  <Code className={styles.skillIcon} size={16} style={{ color: '#722ed1' }} />
                  <span className={styles.skillText}>模型微调与训练</span>
                </div>
                <div className={styles.skillItem}>
                  <Zap className={styles.skillIcon} size={16} style={{ color: '#fa8c16' }} />
                  <span className={styles.skillText}>MCP协议开发</span>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className={styles.footer}>
              <p className={styles.footerText}>
                专注于AI大模型开发与应用，致力于构建智能化解决方案
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
