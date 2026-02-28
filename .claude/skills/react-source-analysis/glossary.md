# React 源码术语表

本文档统一 React 源码中的核心术语定义和翻译约定，确保文档的一致性。

## 核心概念

### Fiber
- **中文**：Fiber（不翻译）
- **定义**：React 的工作单元，代表一个组件实例或 DOM 节点
- **数据结构**：JavaScript 对象，包含组件类型、状态、props、子节点等信息
- **作用**：支持可中断的渲染，实现时间切片和优先级调度

### Reconciliation
- **中文**：协调
- **定义**：对比新旧 Fiber 树，找出变化的过程
- **别名**：不翻译为"调和"
- **作用**：确定哪些组件需要更新、插入或删除

### Scheduler
- **中文**：调度器
- **定义**：负责任务优先级管理和时间切片的模块
- **别名**：不翻译为"调度程序"或"排程器"
- **作用**：根据优先级调度任务执行，避免阻塞主线程

### Lane
- **中文**：直接使用 Lane
- **定义**：使用二进制位表示优先级的模型
- **数据结构**：32 位整数，每一位代表一个优先级
- **作用**：更高效地表示和操作优先级

### Commit
- **中文**：提交
- **定义**：将 Fiber 树的变化应用到 DOM 的阶段
- **别名**：不翻译为"承诺"或"确认"
- **作用**：执行副作用，更新 DOM，调用生命周期方法

### Hook
- **中文**：Hook（不翻译）
- **定义**：让函数组件拥有状态和副作用的机制
- **数据结构**：链表结构，每个 Hook 保存自己的状态
- **作用**：在函数组件中使用状态、副作用、上下文等特性

### Render Phase
- **中文**：渲染阶段
- **定义**：构建 Fiber 树的阶段，可以被中断
- **包含**：beginWork、completeWork
- **特点**：纯函数，不产生副作用

### Commit Phase
- **中文**：提交阶段
- **定义**：将变化应用到 DOM 的阶段，不可中断
- **包含**：before mutation、mutation、layout
- **特点**：执行副作用，同步执行

### Concurrent Mode
- **中文**：并发模式
- **定义**：允许 React 同时准备多个版本 UI 的渲染模式
- **别名**：不翻译为"并行模式"
- **作用**：提高应用响应性，避免长任务阻塞

### Suspense
- **中文**：Suspense（不翻译）
- **定义**：处理异步渲染的组件
- **作用**：在等待异步资源时显示 fallback 内容

## 数据结构

### FiberNode
- **中文**：Fiber 节点
- **定义**：Fiber 的实例对象
- **关键字段**：tag、type、key、stateNode、return、child、sibling

### FiberRoot
- **中文**：Fiber 根节点
- **定义**：整个应用的根节点，包含 current 和 containerInfo
- **作用**：连接 React 树和 DOM 容器

### Update
- **中文**：更新对象
- **定义**：表示一次状态更新的对象
- **关键字段**：lane、action、next
- **作用**：保存更新信息，形成更新队列

### UpdateQueue
- **中文**：更新队列
- **定义**：保存待处理更新的队列
- **数据结构**：环形链表
- **作用**：批量处理多个更新

### Effect
- **中文**：副作用
- **定义**：需要在 commit 阶段执行的操作
- **类型**：DOM 操作、生命周期、useEffect 等
- **标记**：使用 flags 字段标记

## 优先级相关

### SyncLane
- **中文**：不翻译
- **定义**：最高优先级，立即执行
- **使用场景**：用户输入、点击事件

### InputContinuousLane
- **中文**：不翻译
- **定义**：连续事件的优先级
- **使用场景**：滚动、鼠标移动

### DefaultLane
- **中文**：不翻译
- **定义**：普通更新的优先级
- **使用场景**：数据获取、定时器

### TransitionLanes
- **中文**：不翻译
- **定义**：过渡更新的优先级
- **使用场景**：useTransition、useDeferredValue

### IdleLane
- **中文**：不翻译
- **定义**：最低优先级，空闲时执行
- **使用场景**：离屏内容、分析

## Flags（副作用标记）

### Placement
- **中文**：不翻译
- **定义**：需要插入 DOM 的标记
- **二进制值**：0b0000000000000000000000000000010

### Update
- **中文**：不翻译
- **定义**：需要更新 DOM 属性的标记
- **二进制值**：0b0000000000000000000000000000100

### Deletion
- **中文**：不翻译
- **定义**：需要删除 DOM 的标记
- **二进制值**：0b0000000000000000000000000001000

### Passive
- **中文**：不翻译
- **定义**：useEffect 的标记
- **执行时机**：commit 阶段之后异步执行

### Layout
- **中文**：不翻译
- **定义**：useLayoutEffect 的标记
- **执行时机**：commit 阶段同步执行

## WorkTag（节点类型）

### FunctionComponent
- **中文**：函数组件
- **值**：0
- **定义**：函数式组件的 Fiber 节点

### ClassComponent
- **中文**：类组件
- **值**：1
- **定义**：类组件的 Fiber 节点

### HostRoot
- **中文**：根节点
- **值**：3
- **定义**：应用的根 Fiber 节点

### HostComponent
- **中文**：原生组件
- **值**：5
- **定义**：原生 DOM 元素的 Fiber 节点（如 div、span）

### HostText
- **中文**：文本节点
- **值**：6
- **定义**：文本内容的 Fiber 节点

## 翻译约定

### 统一翻译
- **Reconciliation** → 协调（不用"调和"）
- **Scheduler** → 调度器（不用"调度程序"）
- **Commit** → 提交（不用"承诺"）
- **Render** → 渲染（不用"呈现"）
- **Mount** → 挂载（不用"安装"）
- **Update** → 更新（不用"升级"）
- **Effect** → 副作用（不用"效果"）
- **Lane** → 车道（或直接用 Lane）
- **Priority** → 优先级（不用"优先权"）

### 保持英文
以下术语建议保持英文，不翻译：
- **Fiber**
- **Hook**
- **Suspense**
- **Portal**
- **Fragment**
- **Profiler**
- **StrictMode**

### 技术术语
- **Virtual DOM** → 虚拟 DOM
- **Diff Algorithm** → Diff 算法
- **Time Slicing** → 时间切片
- **Batching** → 批量处理
- **Memoization** → 记忆化（或缓存）
- **Lazy Loading** → 懒加载
- **Code Splitting** → 代码分割

## 常见缩写

- **WIP** → Work In Progress（进行中的工作）
- **DOM** → Document Object Model（文档对象模型）
- **JSX** → JavaScript XML
- **SSR** → Server-Side Rendering（服务端渲染）
- **CSR** → Client-Side Rendering（客户端渲染）
- **RSC** → React Server Components（React 服务端组件）
- **API** → Application Programming Interface（应用程序接口）

## 使用建议

### 文档撰写
1. **首次出现**：术语首次出现时，使用"中文（英文）"格式
   - 示例：Fiber 架构（Fiber Architecture）

2. **后续使用**：后续使用中文或英文均可，保持一致
   - 示例：Fiber 节点、Fiber node

3. **代码中**：代码和变量名保持英文
   - 示例：`const fiber = workInProgress;`

4. **注释中**：注释使用中文
   - 示例：`// 获取当前 Fiber 节点`

### 避免混淆
- **Render** vs **Commit**：渲染阶段 vs 提交阶段（不要混用）
- **Mount** vs **Update**：挂载 vs 更新（不要混用）
- **Concurrent** vs **Parallel**：并发 vs 并行（不是同义词）
- **Lane** vs **Priority**：车道 vs 优先级（相关但不完全相同）

## 版本说明

- **基于版本**：React 19.2
- **最后更新**：2026-02-28
- **维护者**：React 源码分析 Skill

## 参考资源

- React 官方文档：https://react.dev
- React 源码仓库：https://github.com/facebook/react
- React RFC：https://github.com/reactjs/rfcs
