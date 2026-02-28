# React 源码解读方法指南

系统化的方法论，帮助你高效阅读 React 源码、撰写高质量文档、设计清晰图表。

**范围**: 专注于 React 19.2 客户端渲染（CSR），不涉及 SSR。

## 一、源码阅读策略

### 1. 分层理解

```
应用层 (react) → 协调层 (react-reconciler) → 调度层 (scheduler) → 渲染层 (react-dom 客户端)
```

**阅读顺序**: 应用层 API → 协调层 Fiber → 调度层 Scheduler → 渲染层 DOM

### 2. 关键路径优先

**初次渲染**:
```
createRoot() → createContainer() → render() → scheduleUpdateOnFiber()
→ performSyncWorkOnRoot() → workLoopSync() → beginWork() → completeWork()
→ commitRoot() → commitMutationEffects() → commitLayoutEffects()
```

**更新流程**:
```
setState() → dispatchSetState() → scheduleUpdateOnFiber()
→ performConcurrentWorkOnRoot() → workLoopConcurrent()
→ beginWork() → completeWork() → commitRoot()
```

### 3. 数据结构驱动

重点关注：
- **Fiber 节点** - 组件实例表示
- **Update 对象** - 状态更新表示
- **Lane** - 优先级表示
- **Hook** - 函数组件状态表示

### 4. 断点分析方法

#### 在 beginWork 设置断点后检查

```javascript
// 1. 组件类型
console.log('Component type:', workInProgress.type);

// 2. 新旧 props 对比
console.log('New props:', workInProgress.pendingProps);
console.log('Old props:', workInProgress.memoizedProps);

// 3. 优先级
console.log('Lanes:', workInProgress.lanes);

// 4. 状态（函数组件是第一个 Hook）
console.log('State:', workInProgress.memoizedState);
```

**分析思路**:
- props 相同且无状态更新 → 可能跳过渲染
- lanes 为 SyncLane → 同步更新（高优先级）
- type 是函数 → 函数组件；字符串 → DOM 元素

#### 在 completeWork 设置断点后检查

```javascript
// 1. DOM 节点
console.log('DOM instance:', workInProgress.stateNode);

// 2. 副作用标记
console.log('Flags:', workInProgress.flags);

// 3. 子树副作用
console.log('Subtree flags:', workInProgress.subtreeFlags);
```

#### 在 commitMutationEffects 设置断点后检查

```javascript
// 查看即将执行的副作用
console.log('Flags:', finishedWork.flags);

if (flags & Placement) {
  console.log('Inserting node:', finishedWork.stateNode);
}
if (flags & Update) {
  console.log('Updating node:', finishedWork.stateNode);
}
```

## 二、文档撰写技巧

### 1. 讲故事而非罗列代码

❌ **不好**: `beginWork` 函数处理 Fiber 节点。它根据 tag 类型调用不同的函数。

✅ **好**: 当 React 开始处理一个 Fiber 节点时，它需要决定如何更新这个节点。这就是 `beginWork` 函数的职责。想象一下，React 就像一个工厂的工人，面对不同类型的零件（Fiber 节点），需要使用不同的工具（处理函数）。

### 2. 使用类比

- **Fiber 架构**: 像可以暂停和恢复的任务清单。传统递归渲染像一口气爬楼梯，Fiber 则可以在每层休息
- **双缓冲**: 像电影制作的双底片技术。一个底片（current tree）正在放映，另一个（workInProgress tree）在后台剪辑

### 3. 渐进式讲解

从简单到复杂：

1. **概念**: React 使用 Fiber 架构实现可中断渲染
2. **原理**: Fiber 是 JavaScript 对象，代表组件实例，包含类型、状态、props
3. **实现**: 在 `ReactFiber.js:123` 中，`createFiber` 函数创建 Fiber 节点
4. **深入**: Fiber 的 `alternate` 字段指向双缓冲树中的对应节点，避免重复创建对象

### 4. 代码注释要点

```javascript
function performUnitOfWork(unitOfWork: Fiber): void {
  // 获取当前 Fiber 节点对应的旧节点
  const current = unitOfWork.alternate;

  // 开始处理当前节点，返回子节点（Fiber 树遍历的核心）
  let next = beginWork(current, unitOfWork, renderLanes);

  // 更新 memoizedProps，为下次更新做准备
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    completeUnitOfWork(unitOfWork);  // 没有子节点，完成当前节点
  } else {
    workInProgress = next;  // 继续处理子节点
  }
}
```

## 三、图表设计原则

### 1. 层次清晰

```
┌─────────────────────────────────────┐
│         应用层 (React API)          │  ← 最高层
├─────────────────────────────────────┤
│      协调层 (Reconciler)            │  ← 核心层
├─────────────────────────────────────┤
│       调度层 (Scheduler)            │  ← 调度层
├─────────────────────────────────────┤
│      渲染层 (Renderer)              │  ← 最底层
└─────────────────────────────────────┘
```

### 2. 流程完整

```
触发更新 → 创建 Update → 加入队列 → 调度更新 → 渲染 → 提交
```

### 3. 关键信息突出

- **红色**: 关键路径
- **蓝色**: 数据流向
- **绿色**: 优化点
- **虚线**: 可选/异步操作

### 4. 适当抽象

- 架构图只显示主要模块
- 流程图只显示主要路径
- 数据流图只显示核心数据

## 四、框架对比技巧

### 1. 选择合适的对比点

✅ **好的对比点**:
- 响应式系统实现
- 虚拟 DOM Diff 算法
- 组件更新粒度
- 编译时优化

❌ **不好的对比点**:
- 生态系统大小（主观易变）
- 社区活跃度（与技术无关）
- 学习曲线（因人而异）

### 2. 提供具体示例

**React 批量更新**:
```typescript
function handleClick() {
  setCount(c => c + 1);  // 不会立即渲染
  setFlag(f => !f);      // 不会立即渲染
  // 批量处理，只触发一次渲染
}
```

**Vue 响应式更新**:
```typescript
const state = reactive({ count: 0, flag: false });
state.count++;  // 只更新依赖 count 的部分
state.flag = !state.flag;  // 只更新依赖 flag 的部分
```

**SolidJS 细粒度响应**:
```typescript
const [count, setCount] = createSignal(0);
setCount(c => c + 1);  // 直接更新对应 DOM 节点
```

### 3. 分析权衡取舍

**React 虚拟 DOM**:
- 优势: 跨平台能力强、声明式、支持时间切片
- 劣势: 内存开销、Diff 计算、更新粒度粗

**Vue 响应式**:
- 优势: 自动依赖追踪、更新粒度细、性能开销小
- 劣势: 响应式复杂性、性能陷阱、跨平台弱

**SolidJS 无虚拟 DOM**:
- 优势: 极致性能、细粒度更新、内存占用小
- 劣势: 编译依赖重、调试困难、生态小

### 4. 使用对比表格

| 维度 | React | Vue | SolidJS |
|------|-------|-----|---------|
| **实现机制** | 虚拟 DOM + Diff | Proxy 响应式 | Signal 响应式 |
| **更新粒度** | 组件级别 | 属性级别 | DOM 节点级别 |
| **依赖追踪** | 手动 | 自动 | 自动 |
| **跨平台** | 强 | 中等 | 弱 |

### 5. 保持客观中立

❌ **避免**: "React 的设计更优雅"、"Vue 的性能更好"

✅ **使用**: "React 的虚拟 DOM 提供了更好的跨平台能力"、"Vue 的响应式系统在某些场景下有更好的性能表现"

## 五、常见陷阱

### 1. 过度简化

❌ **错误**: React 使用虚拟 DOM 来提高性能。

✅ **正确**: React 使用虚拟 DOM 作为中间层，通过 Diff 算法找出最小变更集，然后批量更新真实 DOM。优势不在于"快"，而在于提供声明式编程模型。

### 2. 过度复杂

❌ **错误**: Fiber 节点包含 tag、type、key、ref、return、child、sibling、index、pendingProps、memoizedProps、memoizedState、updateQueue、dependencies、mode、flags、subtreeFlags、deletions、lanes、childLanes、alternate 等字段...

✅ **正确**: Fiber 节点是 JavaScript 对象，包含组件基本信息（type、props）、树结构信息（parent、child、sibling）、状态信息（state、effects）和调度信息（priority、lanes）。我们先关注最核心的几个字段...

### 3. 缺乏上下文

❌ **错误**: `beginWork` 函数根据 tag 调用不同的更新函数。

✅ **正确**: 在 Fiber 树遍历过程中，React 需要处理每个节点。`beginWork` 函数是处理入口，根据节点类型决定如何更新。对于函数组件，调用组件函数获取新 children；对于类组件，调用 render 方法。这体现了 React 的可扩展性。

### 4. 忽略历史演进

React 16 引入 Fiber 架构，不是为了"提高性能"，而是为了实现可中断渲染。React 15 及之前，渲染是同步不可中断的，处理大型组件树时会阻塞主线程造成卡顿。Fiber 通过将渲染拆分为小单元，使 React 可以在浏览器空闲时执行渲染工作。
