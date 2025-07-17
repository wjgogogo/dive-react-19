# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个专注于 React 19 源码深度解读的学习项目，采用 pnpm monorepo 架构。项目包含两个主要包：

- **react-dojo**: React 源码学习的实践环境，使用本地 React 源码构建
- **rspress-site**: 基于 RSPress 的文档站点，提供 React 19 源码解读内容

## 项目结构说明

```
dive-react-19/
├── packages/
│   ├── react-dojo/          # React 源码实践环境
│   │   ├── dojo/           # 实践代码
│   │   ├── source-code/    # React 19 完整源码
│   │   ├── public/         # 静态资源
│   │   └── webpack.config.js # 构建配置
│   └── rspress-site/       # 文档站点
│       ├── docs/           # 文档内容
│       ├── components/     # 组件库
│       └── theme/          # 主题配置
├── images/                 # 项目图片资源
├── outline.md             # 学习大纲
├── CLAUDE.md              # 项目说明
└── pnpm-workspace.yaml    # 工作空间配置
```

## 核心架构

### React Dojo 架构

**重要特性**: 该项目使用完整的 React 19 源码，通过 webpack alias 配置将 react 包指向本地源码：

```javascript
// webpack.config.js 中的关键配置
resolve: {
  alias: {
    react: "./source-code/react/packages/react",
    "react-dom": "./source-code/react/packages/react-dom",
    "react-reconciler": "./source-code/react/packages/react-reconciler",
    scheduler: "./source-code/react/packages/scheduler",
    "react-client": "./source-code/react/packages/react-client",
    "react-dom-bindings": "./source-code/react/packages/react-dom-bindings",
    shared: "./source-code/react/packages/shared",
  }
}
```

这允许直接调试和学习 React 源码，所有断点和调试都会进入真实的 React 源码文件。webpack 配置启用了 source-map 支持，确保调试体验良好。

**核心文件**:

- `dojo/index.jsx`: 主要实践代码入口
- `dojo/slate-interactive-demo.jsx`: Slate 编辑器交互演示
- `source-code/react/`: 完整的 React 19 源码
- `webpack.config.js`: 构建配置，包含源码映射设置
- `public/index.html`: HTML 模板文件

**调试特性**:

- 启用 `cheap-module-source-map` 用于快速调试
- 配置 `__DEV__: true` 启用开发模式特性
- 关闭 Hot Module Replacement 以避免调试干扰
- 使用 `source-map-loader` 确保源码映射正确

### 文档站点架构

基于 RSPress 构建，支持：

- 中文本地化配置
- Mermaid 图表渲染
- 代码预览和语法高亮
- TailwindCSS + shadcn/ui 组件库
- React 19 技术栈

**关键配置**:

- `rspress.config.ts`: 站点配置，包含插件和主题配置
- `docs/`: Markdown 文档内容，按主题分类组织
- `components/ui/`: shadcn/ui 组件库
- `theme/style.css`: 全局样式和 TailwindCSS 配置
- `components.json`: shadcn/ui 组件配置

## 常用开发命令

### 根目录命令

```bash
# 启动 React 实践环境（端口 8080）
pnpm react:dev

# 启动文档开发服务器（端口 3000）
pnpm docs:dev

# 构建文档站点
pnpm docs:build

# 格式化代码（使用 Prettier）
npx prettier --write .
```

### React Dojo 特定命令

```bash
cd packages/react-dojo
# 开发模式（使用 webpack-dev-server）
pnpm dev
```

### 文档站点特定命令

```bash
cd packages/rspress-site
# 开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 开发工作流

基于项目的双包架构，典型的开发流程如下：

1. **React 源码学习**: 在 `react-dojo` 中编写示例代码，通过断点调试源码
2. **文档编写**: 在 `rspress-site/docs` 中记录学习心得和源码解析
3. **组件开发**: 使用 shadcn/ui 组件库扩展文档站点功能

这种工作流确保了理论学习与实践验证的有机结合，形成完整的知识闭环。

## 学习路径和内容组织

项目采用系统化的学习路径设计，文档按照以下结构组织（基于 `outline.md`）：

### 核心学习主题

- **架构与调试**: 整体架构概览、调试环境配置
- **JSX 深入解析**: 语法本质、编译过程、性能优化
- **渲染流程**: Mount、Update、Reconciler 机制
- **Hooks 机制**: 函数组件、Fiber Hooks、渲染过程
- **调度器**: Scheduler 源码解析
- **并发特性**: Concurrent 模式实现
- **事件系统**: 合成事件机制
- **工具链**: 测试工具、开发者工具、编译器

### 文档目录结构

```
docs/
├── basic/          # 基础概念和架构
├── guide/          # 入门指南
├── hooks/          # Hooks 相关
├── render/         # 渲染机制
├── concurrent/     # 并发特性
├── fiber/          # Fiber 架构
├── browser/        # 浏览器相关
├── error-scheduler/ # 错误处理和调度
└── tools/          # 开发工具
```

## Claude Code 工作模式

为了确保在项目中高效协作，Claude Code 遵循标准化的工作模式：

### 任务执行流程

1. **分析需求**: 仔细分析用户需求，明确任务目标和范围
2. **制定计划**: 使用 TodoWrite 工具制定详细的任务计划
3. **执行任务**: 按计划逐步执行，实时更新任务状态
4. **质量检查**: 完成后进行代码格式化和质量检查
5. **文档更新**: 及时更新相关文档和说明

### 用户交互规范

- **简洁回应**: 保持回复简洁明了，避免冗余信息
- **中文优先**: 所有交互使用中文，技术术语适当保留英文
- **实时反馈**: 及时反馈任务进度和状态变化
- **问题澄清**: 需求不明确时主动询问澄清

### 错误处理原则

- **预防优先**: 在执行前进行充分的环境检查
- **及时反馈**: 遇到错误时立即向用户反馈
- **回滚机制**: 必要时提供代码回滚建议
- **学习改进**: 从错误中学习，避免重复问题

## 开发规范和最佳实践

项目遵循严格的开发规范，确保代码质量和团队协作效率：

### LLM 严格模式规则 (RIPER-5)

项目采用 RIPER-5 严格模式协议，确保 AI 助手的工作质量和一致性：

#### 五种工作模式

1. **RESEARCH（调研）**：仅限信息收集，阅读文件、提出澄清性问题
2. **INNOVATE（创新）**：头脑风暴潜在方案，讨论思路和优缺点
3. **PLAN（规划）**：制定详尽技术规范，包含精确文件路径和实施细节
4. **EXECUTE（执行）**：严格按照计划实施，禁止任何偏离或创意添加
5. **REVIEW（复查）**：严格比对实现与计划，标记任何偏离

#### 核心协议

- **模式声明**：每次回复必须以 `🤖 MODE: MODE_NAME` 开头
- **模式切换**：仅在明确发出模式切换信号后才切换
- **严格执行**：在 EXECUTE 模式下必须 100% 遵循计划
- **偏离处理**：发现需要偏离时立即返回 PLAN 模式
- **完整检查**：提供 P0 级别的质量检查清单

### 包管理规范

- **包管理器**: 使用 pnpm，不要使用 npm 或 yarn
- **版本管理**: 锁定依赖版本，避免使用 latest
- **Monorepo 管理**: 使用 workspace 协议进行包间引用
- **安装策略**: 优先安装到具体 package 而非根目录

### 代码质量要求

- **格式化**: 使用 Prettier 进行代码格式化
- **类型安全**: 确保 TypeScript 类型正确性
- **错误处理**: 完善的错误处理机制
- **性能考量**: 注意渲染性能和内存使用

### 文档编写规范

- **语言要求**: 使用简洁直接的中文，避免冗余词汇
- **排版规范**: 中英文间加半角空格，使用正确的全角/半角标点
- **代码示例**: 必须语法正确且可直接运行，包含必要的导入和类型声明
- **Markdown 格式**: 遵循标准格式，正确使用标题层级和列表
- **技术词汇**: 保持术语一致性，首次出现时提供英文原文

### Git 提交规范

- **消息格式**: `<类型>: <简短描述>` 格式，支持详细描述
- **类型标识**: feat、fix、docs、style、refactor、perf、test、chore
- **描述规范**: 使用中文，不超过 50 字符，动词开头现在时
- **分支管理**: 推荐使用 main、feat/、fix/ 命名规范

### 第三方库引入规范

- **文档获取**: 引入新库时必须通过 Context7 MCP 获取官方文档
- **版本匹配**: 确保库版本与项目依赖兼容
- **实现质量**: 遵循官方最佳实践，包含错误处理

## 重要注意事项

- React Dojo 使用的是完整 React 19 源码，修改源码文件会影响调试体验
- 文档站点使用 React 19，确保示例代码兼容性
- 所有文档必须遵循项目的中文技术写作规范
- 项目没有配置 lint 或 test 命令，专注于源码学习和文档编写
- 项目采用 pnpm workspace 管理，配置文件为 `pnpm-workspace.yaml`
- 包含完整的 React 19 源码用于学习，位于 `packages/react-dojo/source-code/react/`

## 示意图绘制规范

源码解读过程中涉及到的技术示意图应遵循统一的绘制规范，支持两种主要格式：

### Mermaid 图表（推荐用于标准图表）

适用于标准化的技术图表，版本控制友好：

- **流程图**: 渲染流程、算法步骤
- **序列图**: 组件间交互、事件传递
- **类图**: 组件结构、继承关系
- **状态图**: 组件状态变迁

### Excalidraw 绘图（用于复杂示意图）

适用于需要自由布局的复杂技术示意图：

- **架构图**: React 整体架构、模块关系
- **数据流图**: Fiber 树结构、更新流程
- **内存布局**: Hook 链表、调度队列
- **交互图**: 用户操作与源码响应

#### Excalidraw 使用规范

基于项目的 `./excalidraw-grammar.md`，绘制示意图时遵循以下规范：

**文件格式**:
- 使用 `.excalidraw` 扩展名
- 采用标准 JSON 结构
- 必须包含 `type: "excalidraw"`, `version: 2`, `elements`, `appState` 字段

**元素类型选择**:
- `rectangle`: 组件、模块、函数块
- `ellipse`: 状态节点、数据对象
- `diamond`: 条件判断、分支逻辑
- `arrow`: 数据流向、调用关系
- `text`: 标注说明、代码片段

**样式规范**:
- 使用项目配色方案：主色 `#1971c2`，辅色 `#2f9e44`，警告色 `#e03131`
- 边框宽度统一使用 2px (`strokeWidth: 2`)
- 关键路径使用实线，次要连接使用虚线
- 透明度用于层次区分 (`opacity: 80` 表示次要元素)

**布局原则**:
- 主流程从左到右或从上到下
- 相关元素使用 `frame` 分组
- 保持适当间距，提高可读性
- 重要元素居中对齐

**文件存储**:
- 技术示意图存放在 `images/diagrams/` 目录
- 按照源码模块分类：`fiber/`, `hooks/`, `scheduler/` 等
- 文件命名格式：`模块名-功能描述.excalidraw`
