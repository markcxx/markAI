export type UpdateType = 'feature' | 'improvement' | 'fix';

export interface UpdateItem {
  description?: string;
  title: string;
  type: UpdateType;
}

export interface ChangelogEntry {
  // e.g. 1.2.0
  date: string;
  // ISO or readable date
  items: UpdateItem[];
  version: string;
}

// Configure changelog entries here. Place latest entry FIRST.
export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2025-11-06',
    items: [
      {
        description: '在聊天页右上角添加查看更新日志按钮。',
        title: '新增更新日志入口',
        type: 'feature',
      },
      {
        description: '在聊天右上角添加查看注册用户信息功能',
        title: '新增查看用户目录功能',
        type: 'feature',
      },
      {
        description: '热烈欢迎超人欧麻吉加入内测名单。',
        title: '欢迎公告',
        type: 'feature',
      },
      {
        description: '有新版本时，打开网站自动弹出更新提示。',
        title: '首次未读自动提示',
        type: 'improvement',
      },
      { description: '提升稳定性与体验。', title: '若干小问题修复', type: 'fix' },
    ],
    version: '1.0.7',
  },
  // Older entries can be appended below
  {
    date: '2025-07-30',
    items: [
      {
        description: '更新界面文本并优化用户配置体验。',
        title: '界面与文案优化',
        type: 'improvement',
      },
    ],
    version: '1.0.6',
  },
  {
    date: '2025-07-28',
    items: [
      {
        description: 'Jina 爬虫支持免费模式，降低使用门槛。',
        title: '免费模式数据源',
        type: 'feature',
      },
      {
        description: '修正 SYSTEM_AGENT 配置并调整 TTS 语音设置。',
        title: '系统与语音配置优化',
        type: 'improvement',
      },
    ],
    version: '1.0.5',
  },
  {
    date: '2025-07-27',
    items: [
      { description: '修复联网功能不可用的问题。', title: '联网功能修复', type: 'fix' },
      {
        description: '接口请求改为随机选择以提升稳定性。',
        title: '请求策略优化',
        type: 'improvement',
      },
      { description: '修复智能命名相关问题，提升体验。', title: '智能命名修复', type: 'fix' },
    ],
    version: '1.0.4',
  },
  {
    date: '2025-07-26',
    items: [
      {
        description: '新增 DeveloperPanel，展示技术栈与项目信息。',
        title: '开发者信息面板',
        type: 'feature',
      },
      { description: '修复 ESLint 与 stylelint 规范问题。', title: '代码规范修复', type: 'fix' },
    ],
    version: '1.0.3',
  },
  {
    date: '2025-07-25',
    items: [
      { description: '修复加载动画不显示 Logo 的问题。', title: '加载动画修复', type: 'fix' },
      {
        description: 'Vercel 部署配置调整以改善上线流程。',
        title: '部署流程优化',
        type: 'improvement',
      },
      { description: '针对 OOM 内存不足进行修复尝试。', title: '内存不足修复尝试', type: 'fix' },
    ],
    version: '1.0.2',
  },
  {
    date: '2025-07-25',
    items: [
      { description: '项目基础架构搭建与初始代码提交。', title: '项目初始化', type: 'feature' },
    ],
    version: '1.0.1',
  },
];

export const LATEST_VERSION = CHANGELOG[0]?.version || '0.0.0';

export const getLatestEntry = (): ChangelogEntry | undefined => CHANGELOG[0];

export const getAllEntries = (): ChangelogEntry[] => CHANGELOG;

export const CHANGELOG_READ_STORAGE_KEY = 'changelog_read_version';
