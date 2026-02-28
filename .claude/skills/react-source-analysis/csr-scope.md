# React 源码解读 - CSR 范围界定

本 skill 专注于 React 19.2 **客户端渲染（CSR）**，不涉及 SSR。

## 包含的内容

### 核心包
- `react` - React 核心 API
- `react-dom` - DOM 渲染器（仅客户端）
- `react-reconciler` - 协调器
- `scheduler` - 调度器

### 核心概念
Fiber 架构、双缓冲、Reconciliation、Diff 算法、Hooks、事件系统、优先级调度（Lane）、并发渲染、Suspense（客户端）、Context、Refs、错误边界

### 渲染流程
客户端初次挂载、客户端更新、Commit 阶段、批量更新、时间切片

### API 解析
`ReactDOM.createRoot()`、`useState`、`useEffect`、`useLayoutEffect`、`useRef`、`useMemo/useCallback`、`useContext`、`useTransition`、`useDeferredValue`、`React.memo`、`React.lazy`（客户端）、`Suspense`（客户端）

## 不包含的内容

### SSR 相关包
- `react-dom/server` - 服务端渲染
- `react-server` - React Server Components
- `react-server-dom-webpack` - RSC 打包

### SSR 相关概念
服务端渲染流程、Hydration、流式渲染、React Server Components、Server Actions、`renderToString`、`renderToPipeableStream`、`renderToReadableStream`、`hydrateRoot`

## 边界案例处理

### Suspense
- ✅ 客户端数据获取场景
- ❌ SSR 流式渲染

### React.lazy
- ✅ 客户端代码分割
- ❌ SSR 代码分割策略

### useEffect vs useLayoutEffect
- ✅ 客户端执行时机差异
- ❌ SSR 副作用处理

### Context
- ✅ 客户端 Context 传递
- ❌ SSR Context 序列化

### 事件系统
- ✅ 浏览器事件处理、合成事件
- ❌ SSR 事件属性序列化

### Refs
- ✅ 客户端 ref 赋值和清理
- ❌ SSR ref 处理

### 错误边界
- ✅ 客户端错误捕获
- ❌ SSR 错误处理

## 文档撰写注意事项

### 1. 明确标注范围
在每篇文档开头说明：
```markdown
**本文档专注于客户端渲染（CSR）场景，不涉及 SSR。**
```

### 2. 避免混淆
- 不要在 CSR 文档中提及 SSR 概念
- 只讲解 CSR 部分
- 明确指出哪些 API 仅限客户端

### 3. 示例代码
所有示例都应该是纯客户端代码：

✅ **正确**:
```typescript
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

❌ **错误**:
```typescript
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
```

### 4. 调试说明
只提供浏览器调试方法：
- 使用浏览器 DevTools
- 使用 React DevTools
- 在浏览器中设置断点

## 总结

核心原则：
- **专注 CSR** - 只讲解客户端渲染
- **深度优先** - 深入讲解每个概念
- **避免混淆** - 不在 CSR 文档中提及 SSR
- **实用导向** - 提供可在浏览器中调试的示例
