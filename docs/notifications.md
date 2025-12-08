# 通知组件使用指南

本文档汇总项目内各类“通知”相关组件的启用方式、关闭方式，以及文案配置的最便捷方法，涵盖主界面顶部横幅、浮动通知卡片、页面内提醒与桌面更新提示。

## 顶部通知条（CloudBanner）

- 功能概述：在主界面顶部“挤压”出一条固定高度的横幅用于公告与引导。
- 集成位置：
  - 桌面主布局渲染：`src/app/[variants]/(main)/_layout/Desktop/index.tsx:35`
  - 移动主布局渲染：`src/app/[variants]/(main)/_layout/Mobile/index.tsx:34`
  - 组件实现：`src/features/AlertBanner/CloudBanner.tsx:44`
  - 高度常量：`src/features/AlertBanner/CloudBanner.tsx:17`（`BANNER_HEIGHT=40`）

### 开启/关闭（环境变量）

- 通过 `FEATURE_FLAGS` 特性开关控制展示：
  - 开启：`FEATURE_FLAGS="+cloud_promotion"`
  - 关闭：`FEATURE_FLAGS="-cloud_promotion"`
- 如需与已有开关合并（建议使用引号包裹）：

```env
# 示例：已有知识库开关的基础上开启顶部横幅
FEATURE_FLAGS="+knowledge_base,+cloud_promotion"
```

### 文案设置（最便捷）

- 修改默认文案文件：`src/locales/default/common.ts:4-11`
  - 键位：`alert.cloud.title`、`alert.cloud.desc`、`alert.cloud.descOnMobile`、`alert.cloud.action`
- 如需按语言自定义，请修改对应语言包：`locales/<lang>/common.json` 中同名键位。

## 浮动通知卡片（Notification）

- 功能概述：右下角浮动卡片，支持自定义内容、关闭按钮与移动端样式。
- 组件实现：`src/components/Notification/index.tsx:56`
- 典型使用（遥测提示）：`src/app/[variants]/(main)/chat/(workspace)/features/TelemetryNotification.tsx:49-53`

### 最简用法（代码示例）

```tsx
import Notification from '@/components/Notification';

// 传入 show 控制显示，children 即通知内容；onCancel 用于关闭
<Notification show={true} onCancel={() => setShow(false)}>
  您的自定义通知内容……
  {/* 可按需使用 i18n 文案或自定义 JSX */}
  {/* 支持 props：mobile / width / height / showCloseIcon 等 */}
</Notification>
```

### 开启/关闭（最便捷）

- 直接通过 `show` 布尔值控制展示；`onCancel` 回调用于关闭与状态收敛。

### 文案设置（最便捷）

- 直接在 `children` 中填充文本或 JSX。
- 如果使用内置遥测提示（`TelemetryNotification`），其文案来源于：`src/locales/default/common.ts:330-336`（键位 `telemetry.*`）。

### 遥测提示显示开关（环境变量）

- 服务端全局配置由环境变量决定：`src/config/langfuse.ts:6-20`
  - 开启：`ENABLE_LANGFUSE=1`
  - 关闭：`ENABLE_LANGFUSE=0`
- 服务端读取与下发位置：`src/server/globalConfig/index.ts:68-71`（`telemetry.langfuse`），前端选择器：`src/store/serverConfig/selectors.ts:10`

## 页面内提醒条（Alert）

- 功能概述：在页面内展示的信息提醒（非顶部挤压），适合版本更新、指引等。
- 现有示例（版本更新提醒）：`src/app/[variants]/(main)/settings/features/UpgradeAlert.tsx:19-37`

### 开启/关闭（环境变量）

- 版本检查由特性开关控制：
  - 开启：`FEATURE_FLAGS="+check_updates"`
  - 关闭：`FEATURE_FLAGS="-check_updates"`
- 实际是否展示取决于运行时是否检测到新版本（`hasNewVersion`），触发逻辑见：`src/features/User/UserPanel/useNewVersion.tsx:8-12`

### 文案设置（最便捷）

- 修改默认文案：`src/locales/default/common.ts:341-345`（键位 `upgradeVersion.*`）
- 自定义用法：可在任意页面引入 `Alert`（`@lobehub/ui`），通过 `message` 传入自定义内容。

## 桌面版更新通知（Electron）

- 功能概述：桌面客户端右上角下载进度与弹出更新说明（非顶部挤压）。
- 组件位置：`src/features/ElectronTitlebar/UpdateNotification.tsx:40-193`
- 适用范围：仅 Electron 桌面版本；通过 IPC 与自动更新服务交互，文案与显示由更新事件驱动。

## 快速参考

- 开关总览：
  - 顶部横幅：`FEATURE_FLAGS="±cloud_promotion"`
  - 版本检查提醒：`FEATURE_FLAGS="±check_updates"`
  - 遥测提示：`ENABLE_LANGFUSE=0/1`（服务端下发为 `telemetry.langfuse`）
- 文案位置总览：
  - 顶部横幅：`src/locales/default/common.ts:4-11`（`alert.cloud.*`）
  - 遥测提示：`src/locales/default/common.ts:330-336`（`telemetry.*`）
  - 版本更新提醒：`src/locales/default/common.ts:341-345`（`upgradeVersion.*`）

以上方式均为“最方便”的启用与文案调整路径：优先通过环境变量开关控制是否展示，优先通过 i18n 文案修改快速调整文本；需要更细粒度的定制时，可在业务页面直接使用 `Notification` 组件并传入自定义内容。

