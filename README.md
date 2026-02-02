# React 19 源码深度解读 (Dive React 19)

这是一个专注于 React 19 源码深度解读的学习项目。通过搭建本地调试环境与编写深度解析文档，旨在帮助开发者深入理解 React 19 的核心架构与实现原理。

## 🌟 项目特色

- **源码级调试环境**：`react-dojo` 包集成了完整的 React 19 源码，配置了 Source Map，支持在开发工具中直接断点调试 React 源码文件，彻底告别盲猜。
- **系统化文档**：`rspress-site` 提供了基于 Rspress 构建的文档站点，内容覆盖 Fiber 架构、Hooks 原理、渲染流程、Scheduler 调度机制等核心模块。
- **图文并茂**：包含大量原创的流程图与架构图（Mermaid & Excalidraw），将晦涩的源码逻辑可视化。
- **实战导向**：理论结合实践，通过 `react-dojo` 中的示例代码验证源码分析的结论。

## 📂 项目结构

本项目采用 pnpm monorepo 架构管理：

```
dive-react-19/
├── packages/
│   ├── react-dojo/          # React 源码实践环境
│   │   ├── dojo/           # 实践代码入口
│   │   ├── source-code/    # 本地 React 19 完整源码
│   │   └── webpack.config.js # 包含源码映射的构建配置
│   └── rspress-site/       # 源码解读文档站点
│       ├── docs/           # Markdown/MDX 文档内容
│       └── components/     # 文档组件
├── CLAUDE.md              # 项目开发指南
└── pnpm-workspace.yaml    # 工作空间配置
```

## 🚀 快速开始

### 前置要求

- Node.js (推荐 LTS 版本)
- pnpm 包管理器

### 安装依赖

```bash
pnpm install
```

### 启动 React 调试环境

启动 `react-dojo` 项目，访问 http://localhost:8080 进行源码调试：

```bash
pnpm react:dev
```

### 启动文档站点

启动 `rspress-site` 文档服务，访问 http://localhost:3000 阅读源码解析：

```bash
pnpm docs:dev
```
