# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 React 19 源码深度解读项目，采用 pnpm monorepo 架构，包含两个核心子包：
- `react-dojo`: React 源码调试环境，集成完整 React 19 源码并配置 Source Map
- `rspress-site`: 基于 Rspress 的文档站点，提供系统化的源码解析文档

## 常用命令

### 依赖管理
```bash
pnpm install                    # 安装所有依赖
```

### 开发环境
```bash
pnpm react:dev                  # 启动 React 调试环境 (http://localhost:8080)
pnpm docs:dev                   # 启动文档站点 (http://localhost:3000)
```

### 构建
```bash
pnpm docs:build                 # 构建文档站点
```

### 子包操作
```bash
pnpm --filter react-dojo <command>    # 在 react-dojo 包中执行命令
pnpm --filter rspress-docs <command>  # 在 rspress-site 包中执行命令
```

## 核心架构

### react-dojo 包
- **目的**: 提供可调试的 React 19 源码环境
- **源码位置**: `packages/react-dojo/source-code/react/` 包含完整的 React 19 源码
- **入口文件**: `packages/react-dojo/dojo/index.jsx` 是实践代码入口
- **构建配置**: `webpack.config.js` 配置了关键的 webpack alias，将 react、react-dom 等包指向本地源码目录，并启用了 source-map-loader 以支持源码调试
- **关键 alias**:
  - `react` → `./source-code/react/packages/react`
  - `react-dom` → `./source-code/react/packages/react-dom`
  - `react-reconciler` → `./source-code/react/packages/react-reconciler`
  - `scheduler` → `./source-code/react/packages/scheduler`
- **开发服务器**: 运行在 8080 端口，禁用了 HMR (hot: false)

### rspress-site 包
- **目的**: 提供 React 19 源码解析文档
- **文档目录**: `packages/rspress-site/docs/` 包含所有 Markdown/MDX 文档
  - `guide/`: 源码解析指南（如何调试、JSX、Scheduler、初次挂载等）
  - `hooks/`: Hooks 相关文档
  - `basic/`: 基础概念文档
- **自定义组件**: `packages/rspress-site/components/` 包含文档中使用的自定义组件
  - `core/diagram.tsx`: 图表组件
  - `core/coder.tsx`: 代码展示组件
  - `core/tabs.tsx`: 标签页组件
- **配置文件**: `rspress.config.ts` 配置了文档站点的主题、导航、侧边栏等
- **技术栈**:
  - Rspress 作为文档框架
  - CodeHike 用于代码高亮和展示
  - Mermaid 用于流程图
  - Excalidraw 用于技术示意图（支持 .excalidraw 文件）
  - Tailwind CSS 用于样式
- **部署**: 配置了 base 路径为 `/dive-react-19/`，适用于 GitHub Pages 部署

## 开发注意事项

### React 源码调试
- 在 `react-dojo/dojo/` 中编写测试代码
- 使用浏览器开发工具可以直接断点调试 React 源码
- webpack 配置了 `cheap-module-source-map` 以平衡调试体验和构建速度

### 文档编写
- 文档使用 MDX 格式，支持在 Markdown 中嵌入 React 组件
- 全局组件（Diagram、Coder、Tabs）已自动注册，可直接在文档中使用
- 支持 Mermaid 语法绘制流程图
- 支持 Excalidraw 文件嵌入（需配置 rspack 规则处理 .excalidraw 文件）
- 文档中的代码块使用 CodeHike 渲染，提供更好的代码展示效果

### 项目约定
- 使用 pnpm 作为包管理器
- 子包名称：`react-dojo` 和 `rspress-docs`（注意 package.json 中的实际名称）
- 文档站点的静态资源放在 `packages/rspress-site/docs/public/` 目录
