#react


直接使用 19-rc 版本
```bash
gcl https://github.com/facebook/react.git src/react 
```


## Debug

- Standardalone 直接启动
- build source map -> 光
- Kasong
- Vite (create-react-app -> eject -> 修改配置)
- Principal -> ignore dev validate


## Catalogue
- 准则
- 架构预览
- How to debug & use repo?
- What's jsx? -> babel playground
- Open source
  - check and warning
- Workflow
	- Render
		- Mount
		- Update
		- Reconciler
			- Diff
		- Bailout
	- Commit
	- LifeCycle
- Hooks
	- setState sync or async?
	- Extend: How to use id for hooks?
- Error handling
	- Render
	- Commit
	- Extend: How to make a useErrorBoundary Hook?
- Scheduler
	- Mini-heap
- Concurrent
	- Lanes
	- Suspense
		- Offscreen
		- Ping & Retry
		- Use
		- Lazy
	- Concurrent hooks
- Synthetic Event
- Testing
	- Act
	- Testing utils
- Devtools
	- useRef for devtools: [https://github.com/facebook/react/issues/20394](https://github.com/facebook/react/issues/20394)
	- Refresh
	- Profiler
	- V8 performance cliff
- Compiler
- Ecosystem
	- Redux
	- Valtio
- 参考
