# React 源码解读文档模板

标准文档结构模板和 useState 完整示例。

## 标准文档结构

```mdx
---
title: {主题标题}
description: {简短描述}
---

# {主题标题}

## 概述

简要介绍本章内容和学习目标。

**学习目标**：
- 目标 1
- 目标 2
- 目标 3

## 架构设计

<Diagram src="/diagrams/{topic}-architecture.excalidraw" />

从整体架构角度讲解设计思路：
- 核心组件及其职责
- 组件间的交互关系
- 数据流向

## 核心源码解析

### {子主题 1}

在 `react-reconciler/src/ReactFiberWorkLoop.js:123` 中：

<Coder
  title="工作循环"
  src="/examples/{topic}-workloop.tsx"
  lang="tsx"
/>

详细讲解源码逻辑...

### {子主题 2}

...

## 实战示例

<Coder
  title="完整示例"
  src="/examples/{topic}-demo.tsx"
  lang="tsx"
/>

结合示例讲解源码如何工作...

## 框架对比

<Tabs>
  <Tab label="React">
    React 的实现方式和特点...
  </Tab>
  <Tab label="Vue">
    Vue 的实现方式和差异...
  </Tab>
  <Tab label="SolidJS">
    SolidJS 的实现方式和差异...
  </Tab>
</Tabs>

### 优势
- ...

### 不足
- ...

## 总结

关键要点回顾：
1. ...
2. ...
3. ...
```

## useState 完整示例

### 示例代码

创建 `packages/rspress-site/examples/usestate-demo.tsx`：

```typescript
import React, { useState } from 'react';

/**
 * useState 基础示例
 */
export function BasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

/**
 * 批量更新示例
 */
export function BatchUpdateDemo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 这三个更新会被批量处理
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    // 最终 count 会增加 3
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Add 3</button>
    </div>
  );
}

/**
 * 惰性初始化示例
 */
export function LazyInitDemo() {
  // 初始化函数只在首次渲染时执行
  const [data, setData] = useState(() => {
    console.log('Computing initial state...');
    return Array.from({ length: 1000 }, (_, i) => i);
  });

  return (
    <div>
      <p>Data length: {data.length}</p>
      <button onClick={() => setData([...data, data.length])}>
        Add Item
      </button>
    </div>
  );
}
```

### 文档内容

创建 `packages/rspress-site/docs/hooks/usestate-deep-dive.mdx`：

```mdx
---
title: useState Hook 深度解析
description: 深入理解 React useState Hook 的实现原理
---

# useState Hook 深度解析

## 概述

`useState` 是 React 中最常用的 Hook，让函数组件能够拥有状态。

**学习目标**：
- 理解 useState 的内部数据结构
- 掌握状态更新的完整流程
- 了解批量更新的实现机制

## 架构设计

<Diagram src="/diagrams/usestate-flow.excalidraw" />

useState 的工作流程：

1. Hook 创建 - 首次渲染时创建 Hook 对象
2. 状态初始化 - 设置初始状态值
3. 更新触发 - 调用 setState 触发更新
4. 更新入队 - 将更新对象加入队列
5. 调度更新 - 调度组件重新渲染
6. 状态计算 - 从更新队列计算新状态
7. 组件渲染 - 使用新状态渲染组件

## 核心源码解析

### Hook 对象结构

在 `react-reconciler/src/ReactFiberHooks.js:123` 中：

```javascript
type Hook = {
  memoizedState: any,        // 当前状态值
  baseState: any,            // 基础状态
  baseQueue: Update<any> | null,  // 基础更新队列
  queue: UpdateQueue<any> | null,  // 更新队列
  next: Hook | null,         // 下一个 Hook
};
```

**设计要点**：
- 使用链表结构连接多个 Hook
- `memoizedState` 保存当前状态
- 双队列设计支持优先级调度

### 首次渲染：mountState

在 `react-reconciler/src/ReactFiberHooks.js:1234` 中：

```javascript
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  // 1. 创建 Hook 对象并加入链表
  const hook = mountWorkInProgressHook();

  // 2. 处理惰性初始化
  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  // 3. 设置初始状态
  hook.memoizedState = hook.baseState = initialState;

  // 4. 创建更新队列
  const queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  };
  hook.queue = queue;

  // 5. 创建 dispatch 函数
  const dispatch = (queue.dispatch = dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ));

  // 6. 返回状态和更新函数
  return [hook.memoizedState, dispatch];
}
```

**关键步骤**：
1. 创建 Hook 对象并加入链表
2. 惰性初始化（如果是函数则调用）
3. 初始化状态
4. 创建更新队列
5. 绑定 dispatch 函数
6. 返回状态值和 dispatch

### 触发更新：dispatchSetState

在 `react-reconciler/src/ReactFiberHooks.js:2345` 中：

```javascript
function dispatchSetState<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
): void {
  // 1. 获取当前优先级
  const lane = requestUpdateLane(fiber);

  // 2. 创建更新对象
  const update = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null,
  };

  // 3. 尝试提前计算状态（优化）
  if (fiber.lanes === NoLanes) {
    const lastRenderedReducer = queue.lastRenderedReducer;
    const currentState = queue.lastRenderedState;
    const eagerState = lastRenderedReducer(currentState, action);

    update.hasEagerState = true;
    update.eagerState = eagerState;

    // 如果状态没变，跳过更新
    if (Object.is(eagerState, currentState)) {
      return;
    }
  }

  // 4. 将更新加入队列
  enqueueUpdate(fiber, queue, update, lane);

  // 5. 调度更新
  scheduleUpdateOnFiber(fiber, lane);
}
```

**关键步骤**：
1. 获取更新优先级
2. 创建更新对象
3. 提前计算优化（如果状态没变则跳过）
4. 入队
5. 调度更新

## 实战示例

<Coder
  title="useState 基础示例"
  src="/examples/usestate-demo.tsx"
  lang="tsx"
/>

在这个示例中：
1. 调用 `useState(0)` 创建状态
2. 点击按钮调用 `setCount(count + 1)`
3. React 将更新加入队列并调度重新渲染
4. 重新渲染时计算新状态并更新 UI

## 框架对比

<Tabs>
  <Tab label="React">
    **实现方式**：
    - 使用 Hook 链表保存状态
    - 通过 Fiber 架构支持可中断渲染
    - 自动批量更新

    **示例**：
    ```typescript
    const [count, setCount] = useState(0);
    setCount(count + 1);
    ```
  </Tab>

  <Tab label="Vue">
    **实现方式**：
    - 使用 Proxy 实现响应式
    - 自动依赖追踪
    - 细粒度更新

    **示例**：
    ```typescript
    const count = ref(0);
    count.value++;  // 自动触发更新
    ```
  </Tab>

  <Tab label="SolidJS">
    **实现方式**：
    - 使用 Signal 实现响应式
    - 编译时优化
    - 无虚拟 DOM

    **示例**：
    ```typescript
    const [count, setCount] = createSignal(0);
    setCount(count() + 1);
    ```
  </Tab>
</Tabs>

### 优势

1. **开发体验**：API 简洁直观，类型支持良好
2. **性能优化**：自动批量更新，提前计算优化
3. **生态系统**：丰富的第三方库，完善的工具链

### 不足

1. **更新粒度**：组件级别，不如细粒度响应式
2. **手动优化**：需要使用 useMemo/useCallback
3. **闭包陷阱**：容易遇到闭包导致的状态不一致

## 总结

useState 是 React Hooks 的基石，其实现体现了 React 的核心设计理念：

1. **简洁的 API** - 提供直观易用的状态管理接口
2. **性能优化** - 通过批量更新、提前计算等策略优化性能
3. **可扩展性** - 基于 Fiber 架构，支持优先级调度和并发渲染
4. **一致性** - 通过 Hook 链表保证调用顺序，确保状态一致性

**关键要点**：
- Hook 使用链表结构保存状态
- 更新通过队列机制实现批量处理
- 提前计算优化避免不必要的渲染
- 优先级调度支持并发渲染
```

## 代码规范

### 示例代码

**基本原则**：简洁、聚焦、可运行、渐进

**代码结构**：
```typescript
// 1. 导入依赖
import React, { useState } from 'react';

// 2. 定义类型（如果需要）
interface Props {
  // ...
}

// 3. 核心示例代码
export default function Demo() {
  // 聚焦于要演示的概念
  return <div>...</div>;
}

// 4. 辅助说明（注释）
```

### 源码引用

**格式**：
```markdown
在 `react-reconciler/src/ReactFiberWorkLoop.js:1234` 中：

\`\`\`javascript
function performUnitOfWork(unitOfWork: Fiber): void {
  // 源码片段...
}
\`\`\`
```

**要点**：
- 标注完整文件路径和行号
- 保持原始缩进
- 添加必要注释

### 注释规范

✅ **好的注释**：
```javascript
// 获取当前 Fiber 节点对应的旧节点
const current = unitOfWork.alternate;

// 开始处理当前节点，返回子节点（Fiber 树遍历的核心）
let next = beginWork(current, unitOfWork, renderLanes);
```

❌ **不好的注释**：
```javascript
// 获取 current
const current = unitOfWork.alternate;

// 调用 beginWork
let next = beginWork(current, unitOfWork, renderLanes);
```
