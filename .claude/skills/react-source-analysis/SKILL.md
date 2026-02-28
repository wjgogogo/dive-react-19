---
name: react-source-analysis
description: React 19.2 源码深度解读。当用户需要分析 React 源码、创建源码解读文档、讲解核心机制（Fiber、Scheduler、Hooks）、对比框架设计、绘制架构图或解释 API 实现原理时使用。专注于客户端渲染（CSR），不涉及 SSR。
---

# React 源码深度解读

专注于 React 19.2 客户端渲染（CSR）源码的深度解读。

**版本**: React 19.2.4 | **范围**: 仅 CSR，不涉及 SSR

## 核心文档

- **[guide.md](./guide.md)** - 源码阅读策略、文档撰写技巧、框架对比方法
- **[template.md](./template.md)** - 文档模板和 useState 完整示例
- **[glossary.md](./glossary.md)** - 术语表和翻译约定
- **[csr-scope.md](./csr-scope.md)** - CSR/SSR 边界说明

## 学习路径

**基础**: Fiber 架构 → Hooks 实现 → 初次挂载 → 更新流程 → Commit 阶段

**进阶**: Scheduler 调度器 → Lane 模型 → Reconciliation → Diff 算法 → Concurrent Mode

## 触发条件

### ✅ 应该触发

- 分析 React 19.2 源码模块或功能
- 创建源码解读文档
- 讲解核心机制（Fiber、Scheduler、Hooks、Reconciliation）
- 对比框架设计差异（React vs Vue/SolidJS）
- 创建源码示例 demo
- 绘制架构或流程图
- 解释 API 实现原理（useState、useEffect）

### ❌ 不应该触发

- SSR 相关问题（超出范围，见 csr-scope.md）
- 调试应用 bug（使用调试工具）
- React 生态工具（Next.js、Remix）
- React Native 内容

### 边界案例

- **Suspense**: ✅ 客户端数据获取 | ❌ SSR 流式渲染
- **React.lazy**: ✅ 客户端代码分割 | ❌ SSR 代码分割
- **事件系统**: ✅ 浏览器事件 | ❌ React Native 事件

## 工作流程

### 1. 源码分析
阅读 `packages/react-dojo/source-code/react/` 中的源码，在浏览器中设置断点调试，标注关键位置。

### 2. 架构图绘制
使用 excalidraw skill 绘制图表，保存到 `packages/rspress-site/docs/public/diagrams/`。

### 3. 示例代码
在 `packages/rspress-site/examples/` 创建可运行 demo，在 react-dojo 中测试。

### 4. 文档撰写
在 `packages/rspress-site/docs/` 创建 MDX 文档，参考 template.md 结构。

## 文档结构（必需章节）

```mdx
---
title: {主题标题}
description: {简短描述}
---

# {主题标题}

## 概述
学习目标和内容简介

## 架构设计
<Diagram src="/diagrams/{topic}.excalidraw" />

## 核心源码解析
引用源码片段，标注文件路径和行号

## 实战示例
<Coder title="示例" src="/examples/{topic}.tsx" lang="tsx" />

## 框架对比
<Tabs>
  <Tab label="React">...</Tab>
  <Tab label="Vue">...</Tab>
  <Tab label="SolidJS">...</Tab>
</Tabs>

## 总结
关键要点回顾
```

## 源码引用规范

标注完整路径和行号：

```markdown
在 `react-reconciler/src/ReactFiberWorkLoop.js:1234` 中：

\`\`\`javascript
function performUnitOfWork(unitOfWork: Fiber): void {
  // 源码片段...
}
\`\`\`
```

## 核心主题

### 必读基础（⭐⭐⭐）
Fiber 架构与双缓冲、Hooks 实现机制、初次挂载流程、更新流程、Commit 阶段

### 进阶主题（⭐⭐）
Scheduler 调度器、Lane 模型、Reconciliation 协调、Diff 算法、Concurrent Mode

### Hooks 专题
useState、useEffect、useRef、useMemo/useCallback、useContext、useTransition、useDeferredValue

### 其他核心功能
Context 传递、事件系统、Refs、错误边界、Suspense（客户端）

## 质量检查清单

- [ ] 源码引用标注了准确的文件路径和行号
- [ ] 创建了至少一个 excalidraw 架构图
- [ ] 编写了可运行的示例代码
- [ ] 包含了所有必需章节
- [ ] 进行了框架对比分析
- [ ] 在 react-dojo 中测试了示例
