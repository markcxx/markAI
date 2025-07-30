'use client';

import { Button } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  ChevronRight,
  Code,
  Database,
  Github,
  Globe,
  Laptop,
  Mail,
  MessageCircle,
  Music,
  User,
  Video,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  aboutSection: css`
    position: relative;

    padding: 24px;
    border: 1px solid ${isDarkMode ? 'rgba(217, 119, 6, 0.5)' : '#fbbf24'};
    border-radius: 16px;

    background: ${isDarkMode
      ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(254, 240, 138, 0.05))'
      : 'linear-gradient(135deg, #fefdf8, #fef7ed)'};
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 10%);

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      inset: 0;

      border-radius: 16px;

      background: ${isDarkMode
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)'};
    }

    &::after {
      content: '';

      position: absolute;
      inset-block-start: -4px;
      inset-inline-start: -4px;

      width: 32px;
      height: 32px;
      border-radius: 50%;

      opacity: 0.2;
      background: linear-gradient(135deg, #fbbf24, #f97316);
      filter: blur(4px);
    }
  `,
  aboutText: css`
    position: relative;
    z-index: 10;

    font-weight: 500;
    line-height: 1.6;
    color: ${token.colorText};
  `,
  avatar: css`
    width: 74px;
    height: 74px;
    border: 2px solid ${isDarkMode ? token.colorBorder : '#ffffff'};
    border-radius: 50%;

    object-fit: cover;
  `,
  avatarContainer: css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;
    border-radius: 50%;

    background: linear-gradient(135deg, #fbbf24, #f97316);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 30%);
  `,
  card: css`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 85vh;
    max-height: 600px;
    border: 0;
    border-radius: 24px 24px 0 0;

    background: ${isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
    backdrop-filter: blur(12px);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 20%);

    @media (min-width: 640px) {
      border-radius: 24px;
    }
  `,
  closeButton: css`
    cursor: pointer;

    position: absolute;
    inset-block-start: 16px;
    inset-inline-end: 16px;

    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;

    color: #d97706;

    background: transparent;

    transition: all 0.2s ease;

    &:hover {
      background: ${isDarkMode ? 'rgba(217, 119, 6, 0.1)' : 'rgba(254, 243, 199, 1)'};
    }
  `,
  contactAmber: css`
    border-color: #f59e0b;

    &:hover {
      border-color: #d97706;
    }
  `,
  contactBlue: css`
    border-color: #3b82f6;

    &:hover {
      border-color: #2563eb;
    }
  `,
  contactGray: css`
    border-color: #6b7280;

    &:hover {
      border-color: #4b5563;
    }
  `,
  contactGreen: css`
    border-color: #10b981;

    &:hover {
      border-color: #059669;
    }
  `,
  contactIcon: css`
    padding: 8px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 100%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
  `,
  contactInfo: css`
    display: flex;
    flex-direction: column;
  `,
  contactItem: css`
    position: relative;

    overflow: hidden;
    display: flex;
    gap: 12px;
    align-items: center;

    padding: 16px;
    border: 1px solid;
    border-radius: 16px;

    background: transparent;

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 10%);
    }
  `,
  contactLabel: css`
    margin-block-end: 2px;
    font-weight: 500;
    color: ${token.colorText};
  `,
  contactPurple: css`
    border-color: #8b5cf6;

    &:hover {
      border-color: #7c3aed;
    }
  `,
  contactValue: css`
    font-size: 14px;
    color: ${token.colorTextSecondary};
  `,
  content: css`
    overflow: hidden;
    flex: 1;
  `,
  cooperationSection: css`
    position: relative;

    padding: 24px;
    border: 1px solid ${isDarkMode ? 'rgba(217, 119, 6, 0.3)' : 'rgba(217, 119, 6, 0.2)'};
    border-radius: 16px;

    text-align: center;

    background: transparent;
  `,
  cooperationText: css`
    position: relative;
    z-index: 10;

    font-size: 14px;
    line-height: 1.6;
    color: ${token.colorText};
  `,
  cooperationTitle: css`
    margin-block-end: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};
  `,
  expertiseGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  `,
  expertiseItem: css`
    position: relative;

    overflow: hidden;
    display: flex;
    gap: 12px;
    align-items: center;

    padding: 16px;
    border: 1px solid ${isDarkMode ? 'rgba(217, 119, 6, 0.8)' : '#fbbf24'};
    border-radius: 16px;

    background: ${isDarkMode
      ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(254, 240, 138, 0.05))'
      : 'linear-gradient(135deg, #fefdf8, #fef7ed)'};

    transition: all 0.3s ease;

    &::before {
      content: '';

      position: absolute;
      inset: 0;

      border-radius: 16px;

      opacity: 0;
      background: ${isDarkMode
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent)'};

      transition: opacity 0.3s ease;
    }

    &::after {
      content: '';

      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      transform: translate(32px, -32px);

      width: 64px;
      height: 64px;
      border-radius: 50%;

      opacity: 0.1;
      background: ${isDarkMode
        ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(251, 191, 36, 0.3))'
        : 'linear-gradient(135deg, #fbbf24, #f97316)'};
    }

    &:hover {
      transform: scale(1.05);
      border-color: ${isDarkMode ? '#fbbf24' : '#f59e0b'};
      box-shadow: 0 8px 24px rgba(217, 119, 6, 20%);
    }

    &:hover::before {
      opacity: 1;
    }
  `,
  footer: css`
    padding-block: 16px;
    padding-inline: 24px;
    border-block-start: 1px dashed ${isDarkMode ? '#d97706' : '#fbbf24'};
    text-align: center;
  `,
  footerText: css`
    font-size: 14px;
    font-weight: 500;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};
  `,
  header: css`
    position: relative;
    padding: 24px;
    border-block-end: 1px dashed ${isDarkMode ? '#d97706' : '#fbbf24'};
  `,
  learnMore: css`
    cursor: pointer;

    display: flex;
    gap: 8px;
    align-items: center;

    height: auto;
    padding: 0;
    border: none;

    font-weight: 500;

    background: transparent;

    transition: all 0.3s ease;

    &:hover {
      transform: translateX(4px);
    }
  `,
  linkContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-block-start: 4px;
  `,
  linkItem: css`
    display: flex;
    gap: 4px;
    align-items: center;

    font-size: 14px;
    color: #d97706;
    text-decoration: none;

    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.05);
      text-decoration: underline;
    }
  `,
  onlineStatus: css`
    position: absolute;
    inset-block-end: -2px;
    inset-inline-end: -2px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    border-radius: 50%;

    background: ${isDarkMode ? token.colorBgContainer : '#ffffff'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 10%);
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

    width: 100%;

    @media (min-width: 640px) {
      inset-block-end: 16px;
      inset-inline: 0;

      max-width: 768px;
      margin-block: 0;
      margin-inline: auto;
    }
  `,
  projectCard: css`
    cursor: pointer;

    position: relative;

    overflow: hidden;

    padding: 24px;
    border: 2px solid;
    border-radius: 16px;

    transition: all 0.5s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 15%);
    }
  `,
  projectCardAmber: css`
    border-color: #fbbf24;
    background: linear-gradient(135deg, #fefdf8, #fef7ed);

    &:hover {
      border-color: #f59e0b;
    }
  `,
  projectCardRose: css`
    border-color: #fb7185;
    background: linear-gradient(135deg, #fdf2f8, #fef2f2);

    &:hover {
      border-color: #f43f5e;
    }
  `,
  projectContainer: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  projectDesc: css`
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 20%);
    border-radius: 12px;

    font-size: 14px;
    line-height: 1.6;
    color: ${token.colorTextSecondary};

    background: rgba(255, 255, 255, 50%);
    backdrop-filter: blur(4px);
  `,
  projectIcon: css`
    padding: 12px;
    border-radius: 16px;

    background: rgba(255, 255, 255, 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 10%);

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  `,
  projectTitle: css`
    margin-block-end: 12px;
    font-size: 20px;
    font-weight: 700;
  `,
  projectTitleAmber: css`
    color: #d97706;
  `,
  projectTitleRose: css`
    color: #be185d;
  `,
  scrollContent: css`
    scrollbar-width: none;

    overflow-y: auto;

    height: 100%;
    padding: 24px;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  section: css`
    margin-block-end: 24px;
  `,
  sectionHeader: css`
    display: flex;
    align-items: center;
    margin-block-end: 16px;
  `,
  sectionTitle: css`
    margin-inline-start: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};
  `,
  skillGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,
  skillItem: css`
    position: relative;

    overflow: hidden;
    display: flex;
    gap: 12px;
    align-items: center;

    padding: 16px;
    border: 1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : '#e9d5ff'};
    border-radius: 16px;

    background: ${isDarkMode
      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))'
      : 'linear-gradient(135deg, #faf5ff, #f3e8ff, #ede9fe)'};

    transition: all 0.3s ease;

    &::before {
      content: '';

      position: absolute;
      inset: 0;

      border-radius: 16px;

      opacity: 0;
      background: ${isDarkMode
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent)'};

      transition: opacity 0.3s ease;
    }

    &::after {
      content: '';

      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      transform: translate(24px, -24px);

      width: 48px;
      height: 48px;
      border-radius: 50%;

      opacity: 0.15;
      background: ${isDarkMode
        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.3))'
        : 'linear-gradient(135deg, #c084fc, #f472b6)'};
    }

    &:hover {
      transform: scale(1.05);
      border-color: ${isDarkMode ? '#a855f7' : '#9333ea'};
      box-shadow: 0 8px 24px rgba(139, 92, 246, 20%);
    }

    &:hover::before {
      opacity: 1;
    }
  `,
  skillText: css`
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
  `,
  statusDot: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #10b981;
  `,
  tabButton: css`
    cursor: pointer;

    position: relative;
    z-index: 10;

    display: flex;
    flex: 1;
    gap: 8px;
    align-items: center;
    justify-content: center;

    height: 100%;
    border: none;

    font-size: 14px;
    font-weight: 500;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};

    background: transparent;

    transition: all 0.3s ease;

    &.active {
      color: ${isDarkMode ? '#1f2937' : '#ffffff'};
    }

    &:hover:not(.active) {
      color: ${isDarkMode ? '#fde68a' : '#b45309'};
    }
  `,
  tabContainer: css`
    position: relative;

    overflow: hidden;
    display: flex;
    align-items: center;

    height: 48px;
    padding: 4px;
    border: 1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'};
    border-radius: 12px;

    background: ${isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
    backdrop-filter: blur(10px);
  `,
  tabNavigation: css`
    padding-block: 16px;
    padding-inline: 24px;
    border-block-end: 1px dashed ${isDarkMode ? '#d97706' : '#fbbf24'};
  `,
  tabSlider: css`
    position: absolute;
    inset-block-start: 4px;

    height: 32px;
    border-radius: 20px;

    background: ${isDarkMode
      ? 'linear-gradient(to right, #f59e0b, #ea580c)'
      : 'linear-gradient(to right, #fbbf24, #f97316)'};
    box-shadow: 0 2px 8px rgba(251, 191, 36, 30%);
  `,
  techGrid: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
  techItem: css`
    cursor: pointer;

    position: relative;

    overflow: hidden;

    padding-block: 8px;
    padding-inline: 16px;
    border: 1px solid ${isDarkMode ? 'rgba(217, 119, 6, 0.3)' : '#fed7aa'};
    border-radius: 24px;

    background: ${isDarkMode ? 'rgba(251, 191, 36, 0.1)' : '#fefdf8'};

    transition: all 0.3s ease;

    &::before {
      content: '';

      position: absolute;
      inset: 0;

      border-radius: 24px;

      opacity: 0;
      background: ${isDarkMode ? 'rgba(251, 191, 36, 0.15)' : '#fef3c7'};

      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: scale(1.05);
      border-color: ${isDarkMode ? '#d97706' : '#f59e0b'};
      background: ${isDarkMode ? 'rgba(251, 191, 36, 0.2)' : '#fef3c7'};
      box-shadow: 0 4px 12px rgba(217, 119, 6, 20%);
    }

    &:hover::before {
      opacity: 1;
    }
  `,
  techText: css`
    position: relative;
    z-index: 10;

    font-size: 14px;
    font-weight: 500;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};
  `,
  title: css`
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: ${isDarkMode ? '#fbbf24' : '#d97706'};
  `,
}));

interface DeveloperPanelProps {
  onClose: () => void;
  open: boolean;
}

type TabType = 'profile' | 'skills' | 'projects' | 'contact';

export default function DeveloperPanel({ open, onClose }: DeveloperPanelProps) {
  const { styles } = useStyles();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const techStack = [
    { category: 'frontend', name: 'React' },
    { category: 'desktop', name: 'Qt' },
    { category: 'desktop', name: 'PyQt' },
    { category: 'backend', name: 'FastAPI' },
    { category: 'desktop', name: 'Electron' },
    { category: 'language', name: 'TypeScript' },
    { category: 'language', name: 'JavaScript' },
    { category: 'language', name: 'Python' },
    { category: 'backend', name: 'Node.js' },
    { category: 'frontend', name: 'Vue.js' },
  ];

  const skills = [
    { icon: <Code size={16} />, name: 'MCP' },
    { icon: <Database size={16} />, name: 'RAG' },
    { icon: <Brain size={16} />, name: '大模型开发' },
    { icon: <Database size={16} />, name: '语料训练' },
    { icon: <Brain size={16} />, name: '模型微调' },
    { icon: <Zap size={16} />, name: 'AI应用开发' },
    { icon: <Code size={16} />, name: 'PyQt软件开发' },
    { icon: <Globe size={16} />, name: '全栈开发' },
    { icon: <Laptop size={16} />, name: '桌面应用开发' },
  ];

  const projects = [
    {
      color: 'amber',
      description:
        '集合多平台（网易云音乐、酷狗音乐等）的免付费音乐平台桌面软件，为用户提供统一的音乐播放体验。',
      icon: <Music size={20} />,
      iconColor: 'text-amber-500',
      textColor: 'projectTitleAmber',
      title: 'CoCoMusic',
    },
    {
      color: 'rose',
      description:
        '专门设计的多平台视频下载工具，支持抖音、B站等平台，提供桌面软件和网页端双重体验。',
      icon: <Video size={20} />,
      iconColor: 'text-rose-500',
      textColor: 'projectTitleRose',
      title: 'VidFlowDesktop',
    },
  ];

  const expertise = [
    { color: 'text-emerald-500', icon: <Database size={18} />, name: '大模型开发与应用' },
    { color: 'text-blue-500', icon: <Brain size={18} />, name: 'RAG系统构建' },
    { color: 'text-purple-500', icon: <Code size={18} />, name: '模型微调与训练' },
    { color: 'text-amber-500', icon: <Zap size={18} />, name: 'MCP协议开发' },
  ];

  const tabs = [
    { icon: <User size={16} />, id: 'profile' as TabType, label: '简介' },
    { icon: <Brain size={16} />, id: 'skills' as TabType, label: '技能' },
    { icon: <Code size={16} />, id: 'projects' as TabType, label: '项目' },
    { icon: <Mail size={16} />, id: 'contact' as TabType, label: '联系' },
  ];

  const getTabIndex = (tabId: TabType) => tabs.findIndex((tab) => tab.id === tabId);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            animate={{ opacity: 1 }}
            className={styles.overlay}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 卡片面板 */}
          <motion.div
            animate={{ y: 0 }}
            className={styles.panel}
            exit={{ y: '100%' }}
            initial={{ y: '100%' }}
            transition={{ damping: 25, stiffness: 300, type: 'spring' }}
          >
            <div className={styles.card}>
              {/* 头部 */}
              <div className={styles.header}>
                <Button className={styles.closeButton} onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>

                <Flexbox align="center" gap={20} horizontal>
                  <div className={styles.avatarContainer}>
                    <Image
                      alt="怪兽马尔克"
                      className={styles.avatar}
                      height={80}
                      src="/images/mark.jpg"
                      width={80}
                    />
                    <div className={styles.onlineStatus}>
                      <div className={styles.statusDot} />
                    </div>
                  </div>

                  <Flexbox>
                    <h2 className={styles.title}>怪兽马尔克</h2>
                    <div className={styles.linkContainer}>
                      <a
                        className={styles.linkItem}
                        href="https://www.galactic-mark.cc"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Globe size={14} />
                        <span>个人博客</span>
                      </a>
                      <a
                        className={styles.linkItem}
                        href="https://github.com/markcxx"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                      </a>
                      <a
                        className={styles.linkItem}
                        href="https://space.bilibili.com/677577553"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <svg fill="currentColor" height={14} viewBox="0 0 24 24" width={14}>
                          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906l-1.174 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.764.283 1.395.789 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.789-1.893v-7.52c-.02-.765-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8.24 9.693c.356 0 .653.124.893.373.24.249.36.551.36.907v4.267c0 .356-.12.658-.36.907-.24.249-.537.373-.893.373-.356 0-.658-.124-.907-.373-.249-.249-.373-.551-.373-.907V11.24c0-.356.124-.658.373-.907.249-.249.551-.373.907-.373zm7.520 0c.356 0 .653.124.893.373.24.249.36.551.36.907v4.267c0 .356-.12.658-.36.907-.24.249-.537.373-.893.373-.356 0-.658-.124-.907-.373-.249-.249-.373-.551-.373-.907V11.24c0-.356.124-.658.373-.907.249-.249.551-.373.907-.373z" />
                        </svg>
                        <span>B站</span>
                      </a>
                      <a
                        className={styles.linkItem}
                        href="https://blog.csdn.net/qq_64440709?type=blog3"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <svg fill="currentColor" height={14} viewBox="0 0 24 24" width={14}>
                          <path d="M7.999 0v24l8.001-12-8.001-12zm8.001 0v24l8.001-12-8.001-12z" />
                        </svg>
                        <span>CSDN</span>
                      </a>
                    </div>
                  </Flexbox>
                </Flexbox>
              </div>

              {/* 标签页导航 */}
              <div className={styles.tabNavigation}>
                <div className={styles.tabContainer}>
                  {/* 背景滑块 */}
                  <motion.div
                    animate={{
                      left: `${(getTabIndex(activeTab) * 100) / tabs.length + 1}%`,
                    }}
                    className={styles.tabSlider}
                    style={{
                      width: `${100 / tabs.length - 1}%`,
                    }}
                    transition={{
                      damping: 30,
                      stiffness: 300,
                      type: 'spring',
                    }}
                  />

                  {/* 标签按钮 */}
                  {tabs.map((tab) => (
                    <button
                      className={`${styles.tabButton} ${activeTab === tab.id ? 'active' : ''}`}
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 内容区域 */}
              <div className={styles.content}>
                <div className={styles.scrollContent}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      initial={{ opacity: 0, y: 20 }}
                      key={activeTab}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === 'profile' && (
                        <div className={styles.section}>
                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Brain className="h-5 w-5" style={{ color: '#f59e0b' }} />
                              <h3 className={styles.sectionTitle}>关于我</h3>
                            </div>
                            <div className={styles.aboutSection}>
                              <p className={styles.aboutText}>
                                专注于AI大模型开发与应用，致力于构建智能化解决方案。拥有丰富的前端和后端开发经验，
                                特别擅长AI应用开发和桌面应用程序开发。
                              </p>
                            </div>
                          </div>

                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Zap className="h-5 w-5" style={{ color: '#f59e0b' }} />
                              <h3 className={styles.sectionTitle}>专长领域</h3>
                            </div>
                            <div className={styles.expertiseGrid}>
                              {expertise.map((item, index) => (
                                <div className={styles.expertiseItem} key={index}>
                                  <div style={{ color: item.color.replace('text-', '#') }}>
                                    {item.icon}
                                  </div>
                                  <span className={styles.skillText}>{item.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'skills' && (
                        <div className={styles.section}>
                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Code className="h-5 w-5" style={{ color: '#3b82f6' }} />
                              <h3 className={styles.sectionTitle}>技术栈</h3>
                            </div>
                            <div className={styles.techGrid}>
                              {techStack.map((tech, index) => (
                                <div className={styles.techItem} key={index}>
                                  <span className={styles.techText}>{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Brain className="h-5 w-5" style={{ color: '#8b5cf6' }} />
                              <h3 className={styles.sectionTitle}>专业技能</h3>
                            </div>
                            <div className={styles.skillGrid}>
                              {skills.map((skill, index) => (
                                <div className={styles.skillItem} key={index}>
                                  <div style={{ color: '#8b5cf6' }}>{skill.icon}</div>
                                  <span className={styles.skillText}>{skill.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'projects' && (
                        <div className={styles.section}>
                          <div className={styles.projectContainer}>
                            {projects.map((project, index) => (
                              <div
                                className={`${styles.projectCard} ${
                                  project.color === 'amber'
                                    ? styles.projectCardAmber
                                    : styles.projectCardRose
                                }`}
                                key={index}
                              >
                                <Flexbox align="flex-start" gap={16} horizontal>
                                  <div className={styles.projectIcon}>
                                    <div style={{ color: project.iconColor.replace('text-', '#') }}>
                                      {project.icon}
                                    </div>
                                  </div>
                                  <Flexbox style={{ flex: 1 }}>
                                    <h4
                                      className={`${styles.projectTitle} ${
                                        project.color === 'amber'
                                          ? styles.projectTitleAmber
                                          : styles.projectTitleRose
                                      }`}
                                    >
                                      {project.title}
                                    </h4>
                                    <div className={styles.projectDesc}>
                                      <p>{project.description}</p>
                                    </div>
                                    <Button
                                      className={styles.learnMore}
                                      onClick={() => {
                                        if (project.title === 'VidFlowDesktop') {
                                          window.open('https://vidflow.markqq.com', '_blank');
                                        }
                                      }}
                                      style={{
                                        color: project.color === 'amber' ? '#d97706' : '#be185d',
                                      }}
                                    >
                                      <span>了解更多</span>
                                      <ChevronRight size={16} />
                                    </Button>
                                  </Flexbox>
                                </Flexbox>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'contact' && (
                        <div className={styles.section}>
                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Mail className="h-5 w-5" style={{ color: '#f59e0b' }} />
                              <h3 className={styles.sectionTitle}>联系方式</h3>
                            </div>
                            <Flexbox gap={16}>
                              <div className={`${styles.contactItem} ${styles.contactBlue}`}>
                                <div className={styles.contactIcon}>
                                  <Mail size={18} style={{ color: '#3b82f6' }} />
                                </div>
                                <div className={styles.contactInfo}>
                                  <span className={styles.contactLabel}>邮箱</span>
                                  <span className={styles.contactValue}>2811016860@qq.com</span>
                                </div>
                              </div>

                              <div className={`${styles.contactItem} ${styles.contactGreen}`}>
                                <div className={styles.contactIcon}>
                                  <MessageCircle size={18} style={{ color: '#10b981' }} />
                                </div>
                                <div className={styles.contactInfo}>
                                  <span className={styles.contactLabel}>微信</span>
                                  <span className={styles.contactValue}>C18583219975</span>
                                </div>
                              </div>

                              <div className={`${styles.contactItem} ${styles.contactPurple}`}>
                                <div className={styles.contactIcon}>
                                  <svg
                                    fill="currentColor"
                                    height={18}
                                    style={{ color: '#8b5cf6' }}
                                    viewBox="0 0 24 24"
                                    width={18}
                                  >
                                    <path d="M12.017 0C5.396 0 .029 4.826.029 10.777c0 3.148 1.606 5.978 4.196 7.765.597.412.985 1.108.985 1.882 0 .226-.043.442-.123.642C4.783 21.415 4.553 21.7 4.553 22c0 .342.273.615.615.615.126 0 .243-.042.338-.115 1.671-1.256 3.1-2.85 4.207-4.794 1.106.131 2.246.2 3.404.2 6.621 0 11.988-4.826 11.988-10.777C24.005 4.826 18.638.001 12.017.001zM8.5 14.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm3.5 0c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm3.5 0c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75z" />
                                  </svg>
                                </div>
                                <div className={styles.contactInfo}>
                                  <span className={styles.contactLabel}>QQ</span>
                                  <span className={styles.contactValue}>2811016860</span>
                                </div>
                              </div>
                            </Flexbox>
                          </div>

                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <Globe className="h-5 w-5" style={{ color: '#f59e0b' }} />
                              <h3 className={styles.sectionTitle}>在线平台</h3>
                            </div>
                            <Flexbox gap={16} horizontal wrap="wrap">
                              <a
                                className={`${styles.contactItem} ${styles.contactAmber}`}
                                href="https://www.galactic-mark.cc"
                                rel="noopener noreferrer"
                                style={{ flex: '1 1 300px', textDecoration: 'none' }}
                                target="_blank"
                              >
                                <div className={styles.contactIcon}>
                                  <Globe size={18} style={{ color: '#f59e0b' }} />
                                </div>
                                <div className={styles.contactInfo}>
                                  <span className={styles.contactLabel}>个人博客</span>
                                  <span className={styles.contactValue}>技术分享与思考</span>
                                </div>
                              </a>

                              <a
                                className={`${styles.contactItem} ${styles.contactGray}`}
                                href="https://github.com/markcxx"
                                rel="noopener noreferrer"
                                style={{ flex: '1 1 300px', textDecoration: 'none' }}
                                target="_blank"
                              >
                                <div className={styles.contactIcon}>
                                  <Github size={18} style={{ color: '#6b7280' }} />
                                </div>
                                <div className={styles.contactInfo}>
                                  <span className={styles.contactLabel}>GitHub</span>
                                  <span className={styles.contactValue}>开源项目展示</span>
                                </div>
                              </a>
                            </Flexbox>
                          </div>

                          <div className={styles.cooperationSection}>
                            <h4 className={styles.cooperationTitle}>合作咨询</h4>
                            <p className={styles.cooperationText}>
                              如果您对AI大模型开发、桌面应用开发或其他技术合作感兴趣，欢迎通过以上方式联系我。
                              我很乐意与您探讨技术方案和合作可能性。
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 底部 */}
              <div className={styles.footer}>
                <p className={styles.footerText}>
                  专注于AI大模型开发与应用，致力于构建智能化解决方案
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
