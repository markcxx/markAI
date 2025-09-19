'use client';

import { createStyles } from 'antd-style';
import { motion } from 'framer-motion';
import {
  Brain,
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
  Zap,
} from 'lucide-react';
import Image from 'next/image';

import { DEVELOPER_LINKS } from '@/const/branding';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  avatar: css`
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 128px;
    height: 128px;
    border: 3px solid ${isDarkMode ? '#374151' : '#e5e7eb'};
    border-radius: 50%;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 15%);
  `,
  avatarContainer: css`
    position: relative;
  `,
  contactCard: css`
    padding: 24px;
    border: 1px solid ${token.colorBorder};
    border-radius: 16px;

    text-align: center;

    background: ${token.colorBgContainer};

    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 10%);
    }
  `,
  contactGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-block-end: 48px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,
  contactIcon: css`
    display: flex;
    justify-content: center;
    margin-block-end: 16px;
    color: ${token.colorTextSecondary};
  `,
  contactLabel: css`
    margin-block-end: 8px;
    font-weight: 600;
    color: ${token.colorText};
  `,
  contactValue: css`
    color: ${token.colorTextSecondary};
  `,
  container: css`
    min-height: 100vh;
    background: ${token.colorBgContainer};
  `,
  cooperationCard: css`
    padding: 32px;
    border: 1px solid ${token.colorBorder};
    border-radius: 16px;

    text-align: center;

    background: ${token.colorBgContainer};
  `,
  cooperationText: css`
    max-width: 512px;
    margin-block: 0;
    margin-inline: auto;

    line-height: 1.6;
    color: ${token.colorTextSecondary};
  `,
  cooperationTitle: css`
    margin-block-end: 16px;
    font-size: 20px;
    font-weight: 600;
    color: ${token.colorText};
  `,
  footer: css`
    padding-block: 32px;
    padding-inline: 0;
    color: white;
    background: ${isDarkMode ? '#1e293b' : '#0f172a'};
  `,
  footerText: css`
    color: ${isDarkMode ? '#cbd5e1' : '#e2e8f0'};
    text-align: center;
  `,
  header: css`
    position: relative;
    overflow: hidden;
    color: white;
    background: ${isDarkMode ? '#1e293b' : '#0f172a'};
  `,
  headerContent: css`
    position: relative;

    max-width: 1152px;
    margin-block: 0;
    margin-inline: auto;
    padding-block: 64px;
    padding-inline: 24px;
  `,
  headerFlex: css`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  `,
  headerOverlay: css`
    position: absolute;
    inset: 0;
    background: ${isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(15, 23, 42, 0.5)'};
  `,
  onlineStatus: css`
    position: absolute;
    inset-block-end: -8px;
    inset-inline-end: -8px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    border: 4px solid white;
    border-radius: 50%;

    background: #10b981;
  `,
  projectCard: css`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;

    &:nth-child(even) {
      @media (min-width: 1024px) {
        flex-direction: row-reverse;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  `,
  projectContent: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
  `,
  projectDesc: css`
    font-size: 18px;
    line-height: 1.6;
    color: ${token.colorTextSecondary};
  `,
  projectFeature: css`
    padding-block: 4px;
    padding-inline: 12px;
    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    font-size: 14px;
    color: ${token.colorTextSecondary};

    background: ${token.colorBgContainer};
  `,
  projectFeatures: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  projectImage: css`
    position: relative;

    overflow: hidden;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    height: 256px;
    padding: 32px;
    border-radius: 16px;
  `,
  projectImageAmber: css`
    background: linear-gradient(135deg, #fef3c7, #fde68a);
  `,
  projectImageBlue: css`
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  `,
  projectImageGreen: css`
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  `,
  projectImagePurple: css`
    background: linear-gradient(135deg, #e9d5ff, #d8b4fe);
  `,
  projectImageRose: css`
    background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  `,
  projectLink: css`
    display: flex;
    gap: 8px;
    align-items: center;

    padding-block: 8px;
    padding-inline: 16px;
    border: 1px solid currentcolor;
    border-radius: 8px;

    font-size: 14px;
    font-weight: 600;
    color: inherit;
    text-decoration: none;

    background: transparent;

    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);

      border-color: ${isDarkMode ? '#374151' : '#1f2937'};

      color: #fff;

      background: ${isDarkMode ? '#374151' : '#1f2937'};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 15%);
    }
  `,
  projectLinks: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
  projectTitle: css`
    margin-block-end: 16px;
    font-size: 24px;
    font-weight: 700;
  `,
  projectTitleAmber: css`
    color: #d97706;
  `,
  projectTitleBlue: css`
    color: #2563eb;
  `,
  projectTitleGreen: css`
    color: #059669;
  `,
  projectTitlePurple: css`
    color: #7c3aed;
  `,
  projectTitleRose: css`
    color: #be185d;
  `,
  projectsGrid: css`
    display: flex;
    flex-direction: column;
    gap: 64px;
  `,
  section: css`
    padding-block: 64px;
    padding-inline: 0;
  `,
  sectionAlt: css`
    background: ${isDarkMode ? token.colorBgLayout : '#f8fafc'};
  `,
  sectionContainer: css`
    max-width: 1152px;
    margin-block: 0;
    margin-inline: auto;
    padding-block: 0;
    padding-inline: 24px;
  `,
  sectionTitle: css`
    margin-block-end: 48px;

    font-size: 32px;
    font-weight: 700;
    color: ${token.colorText};
    text-align: center;
  `,
  skillCard: css`
    padding: 24px;
    border: 1px solid ${token.colorBorder};
    border-radius: 16px;

    background: ${token.colorBgContainer};

    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 10%);
    }
  `,
  skillIcon: css`
    margin-block-end: 16px;
    color: ${token.colorPrimary};
  `,
  skillName: css`
    font-size: 16px;
    font-weight: 600;
    color: ${token.colorText};
  `,
  skillsGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  `,
  socialLink: css`
    display: flex;
    gap: 8px;
    align-items: center;

    padding-block: 8px;
    padding-inline: 16px;
    border-radius: 8px;

    color: ${isDarkMode ? '#1e293b' : '#0f172a'};
    text-decoration: none;

    background: white;

    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      background: ${isDarkMode ? '#f1f5f9' : '#f8fafc'};
    }
  `,
  socialLinks: css`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  `,
  statusDot: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #34d399;
  `,
  techGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
  `,
  techIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    margin-block-end: 12px;
    border-radius: 8px;

    color: ${isDarkMode ? '#cbd5e1' : '#64748b'};

    background: ${isDarkMode ? '#475569' : '#e2e8f0'};
  `,
  techItem: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;
    border: 1px solid ${token.colorBorder};
    border-radius: 12px;

    background: ${token.colorBgContainer};

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 10%);
    }
  `,
  techName: css`
    font-weight: 600;
    color: ${token.colorText};
  `,
  userDesc: css`
    max-width: 512px;
    margin-block-end: 24px;

    font-size: 20px;
    line-height: 1.6;
    color: ${isDarkMode ? '#cbd5e1' : '#e2e8f0'};
  `,
  userInfo: css`
    text-align: center;

    @media (min-width: 768px) {
      text-align: start;
    }
  `,
  userName: css`
    margin-block-end: 16px;
    font-size: 36px;
    font-weight: 700;
  `,
}));

export default function DeveloperProfile() {
  const { styles } = useStyles();

  const techStack = [
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'Node.js',
    'Vue.js',
    'Qt',
    'PyQt',
    'FastAPI',
    'Electron',
  ];

  const skills = [
    { icon: <Code size={20} />, name: 'MCP协议开发' },
    { icon: <Database size={20} />, name: 'RAG系统构建' },
    { icon: <Brain size={20} />, name: '大模型开发' },
    { icon: <Database size={20} />, name: '语料训练' },
    { icon: <Brain size={20} />, name: '模型微调' },
    { icon: <Zap size={20} />, name: 'AI应用开发' },
    { icon: <Code size={20} />, name: 'PyQt软件开发' },
    { icon: <Globe size={20} />, name: '全栈开发' },
    { icon: <Laptop size={20} />, name: '桌面应用开发' },
  ];

  const projects = [
    {
      description:
        '集合多平台（网易云音乐、酷狗音乐、酷我音乐等）的免付费音乐平台桌面软件，为用户提供统一的音乐播放体验。',
      features: ['多平台整合', '免费音乐', '桌面应用', '统一体验'],
      github: '#',
      icon: <Music size={24} />,
      title: 'CoCoMusic',
      type: 'amber',
      url: '#',
    },
    {
      description:
        '专门设计的多平台视频下载工具，支持抖音、B站等平台，提供桌面软件和网页端双重体验。',
      features: ['多平台支持', '视频下载', '双端体验', '高效稳定'],
      github: 'https://github.com/markcxx/VidFlowDesktop',
      icon: <Video size={24} />,
      title: 'VidFlowDesktop',
      type: 'rose',
      url: 'https://vidflow.markqq.com',
    },
    {
      description:
        '基于ESP32小智AI应用开发的电脑桌面版应用，支持MCP调用，为没有硬件条件的人群提供使用便利',
      features: ['多平台支持', 'XiaoZhiAI', '语音对话', 'MCP调用'],
      github: 'https://github.com/markcxx/Xiaozhi-ai',
      icon: <Video size={24} />,
      title: 'XiaoZhi AI桌面版',
      type: 'blue',
      url: 'https://github.com/markcxx/Xiaozhi-ai',
    },
    {
      description:
        '基于和风天气的后端天气服务接口，支持天气预报，实时天气，空气质量预测等，支持MCP服务',
      features: ['全栈开发', 'Fastapi', '天气服务', 'MCP调用'],
      github: 'https://github.com/markcxx/momoweather',
      icon: <Video size={24} />,
      title: '墨墨天气API',
      type: 'green',
      url: 'https://momoweather.markqq.com',
    },
    {
      description:
        '支持OPENAI协议的大模型服务，支持主流开源模型如deepseek，Qwen,kimi，glm4.5，gpt-oss-120b等，支持MCP服务',
      features: ['多平台支持', 'OPENAI协议', '大模型服务', 'MCP调用'],
      github: 'https://github.com/markcxx/huggingface-openai-proxy',
      icon: <Video size={24} />,
      title: 'Openai协议MARKAI模型后端服务',
      type: 'purple',
      url: '#',
    },
  ];

  const contactInfo = [
    { icon: <Mail size={20} />, label: '邮箱', value: DEVELOPER_LINKS.contact.email },
    { icon: <MessageCircle size={20} />, label: '微信', value: DEVELOPER_LINKS.contact.wechat },
    { icon: <User size={20} />, label: 'QQ', value: DEVELOPER_LINKS.contact.qq },
  ];

  const socialLinks = [
    { icon: <Globe size={20} />, label: '个人博客', url: DEVELOPER_LINKS.blog },
    { icon: <Github size={20} />, label: 'GitHub', url: DEVELOPER_LINKS.github },
  ];

  return (
    <div className={styles.container}>
      {/* 头部区域 */}
      <div className={styles.header}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <div className={styles.headerFlex}>
            {/* 头像区域 */}
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className={styles.avatarContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.avatar}>
                <Image
                  alt="怪兽马尔克"
                  height={128}
                  src="/images/mark.jpg"
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  width={128}
                />
              </div>
              <div className={styles.onlineStatus}>
                <div className={styles.statusDot} />
              </div>
            </motion.div>

            {/* 基本信息 */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className={styles.userInfo}
              initial={{ opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className={styles.userName}>怪兽马尔克</h1>
              <p className={styles.userDesc}>
                专注于AI大模型开发与应用，致力于构建智能化解决方案。拥有丰富的前端和后端开发经验，特别擅长AI应用开发和桌面应用程序开发。
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                  <a
                    className={styles.socialLink}
                    href={link.url}
                    key={index}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 专长领域 */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className={styles.sectionTitle}>专长领域</h2>
            <div className={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <motion.div
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 30 }}
                  key={index}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className={styles.sectionTitle}>技术栈</h2>
            <div className={styles.techGrid}>
              {techStack.map((tech, index) => (
                <motion.div
                  className={styles.techItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  key={index}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <div className={styles.techIcon}>
                    <Code size={20} />
                  </div>
                  <span className={styles.techName}>{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className={styles.sectionTitle}>项目展示</h2>
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <motion.div
                  className={styles.projectCard}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  key={index}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  {/* 项目图片区域 */}
                  <div
                    className={`${styles.projectImage} ${
                      project.type === 'amber'
                        ? styles.projectImageAmber
                        : project.type === 'blue'
                          ? styles.projectImageBlue
                          : project.type === 'green'
                            ? styles.projectImageGreen
                            : project.type === 'purple'
                              ? styles.projectImagePurple
                              : styles.projectImageRose
                    }`}
                  >
                    <div style={{ fontSize: '96px', opacity: 0.2 }}>{project.icon}</div>
                  </div>

                  {/* 项目描述区域 */}
                  <div className={styles.projectContent}>
                    <div>
                      <h3
                        className={`${styles.projectTitle} ${
                          project.type === 'amber'
                            ? styles.projectTitleAmber
                            : project.type === 'blue'
                              ? styles.projectTitleBlue
                              : project.type === 'green'
                                ? styles.projectTitleGreen
                                : project.type === 'purple'
                                  ? styles.projectTitlePurple
                                  : styles.projectTitleRose
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className={styles.projectDesc}>{project.description}</p>
                    </div>

                    <div>
                      <h4 style={{ color: 'inherit', fontWeight: 600, marginBottom: '12px' }}>
                        核心特性
                      </h4>
                      <div className={styles.projectFeatures}>
                        {project.features.map((feature, featureIndex) => (
                          <span className={styles.projectFeature} key={featureIndex}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.projectLinks}>
                      {project.url && project.url !== '#' && (
                        <a
                          className={`${styles.projectLink} ${
                            project.type === 'amber'
                              ? styles.projectTitleAmber
                              : project.type === 'blue'
                                ? styles.projectTitleBlue
                                : project.type === 'green'
                                  ? styles.projectTitleGreen
                                  : project.type === 'purple'
                                    ? styles.projectTitlePurple
                                    : styles.projectTitleRose
                          }`}
                          href={project.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Globe size={16} />
                          访问项目
                        </a>
                      )}
                      {project.github && project.github !== '#' && (
                        <a
                          className={`${styles.projectLink} ${
                            project.type === 'amber'
                              ? styles.projectTitleAmber
                              : project.type === 'blue'
                                ? styles.projectTitleBlue
                                : project.type === 'green'
                                  ? styles.projectTitleGreen
                                  : project.type === 'purple'
                                    ? styles.projectTitlePurple
                                    : styles.projectTitleRose
                          }`}
                          href={project.github}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className={styles.sectionTitle}>联系方式</h2>
            <div className={styles.contactGrid}>
              {contactInfo.map((contact, index) => (
                <motion.div
                  className={styles.contactCard}
                  initial={{ opacity: 0, y: 30 }}
                  key={index}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.contactIcon}>{contact.icon}</div>
                  <h3 className={styles.contactLabel}>{contact.label}</h3>
                  <p className={styles.contactValue}>{contact.value}</p>
                </motion.div>
              ))}
            </div>

            <div className={styles.cooperationCard}>
              <h3 className={styles.cooperationTitle}>合作咨询</h3>
              <p className={styles.cooperationText}>
                如果您对AI大模型开发、桌面应用开发或其他技术合作感兴趣，欢迎通过以上方式联系我。
                我很乐意与您探讨技术方案和合作可能性。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 底部 */}
      <footer className={styles.footer}>
        <div className={styles.sectionContainer}>
          <p className={styles.footerText}>专注于AI大模型开发与应用，致力于构建智能化解决方案</p>
        </div>
      </footer>
    </div>
  );
}
