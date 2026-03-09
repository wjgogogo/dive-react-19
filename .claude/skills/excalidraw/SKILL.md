---
name: excalidraw
description: 创建和编辑 Excalidraw 技术示意图。当用户要求创建流程图、架构图、序列图、数据流图、思维导图或任何 .excalidraw 格式的可视化图表时使用。
---

# Excalidraw 技术示意图创建

生成手绘风格的技术示意图，输出 Excalidraw JSON 格式（`.excalidraw` 文件）。

## 文件结构

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

### 兼容性硬规则（必须遵守）

- **禁止手写或伪造元素 `index`（order key）字段**  
  该字段由 Excalidraw 内部维护，手工生成很容易触发：`invalid order key: xx`。
- 新建图时：**所有元素都不要包含 `index` 字段**。
- 编辑已有图时：不要新增/修改 `index`；如果出现 order key 错误，优先移除全文件元素的 `index` 字段后再保存。
- **`fontFamily` 默认必须为 `5`（ExcalFont）**。只有用户明确要求其他字体时，才可使用 `1/2/3`。

## 元素通用属性

每个元素必须包含以下完整属性：

```json
{
  "id": "unique-id",
  "type": "rectangle",
  "x": 0,
  "y": 0,
  "width": 100,
  "height": 100,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 1,
  "opacity": 100,
  "seed": 12345,
  "version": 1,
  "versionNonce": 12345,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false
}
```

## 元素类型

| 类型 | 用途 |
|------|------|
| `rectangle` | 组件、模块、容器、流程框 |
| `ellipse` | 状态节点、开始/结束点、数据对象 |
| `diamond` | 条件判断、分支逻辑、决策节点 |
| `text` | 标注说明、代码片段 |
| `arrow` | 数据流向、调用关系 |
| `line` | 连接线（无箭头）、生命线 |
| `freedraw` | 手绘路径 |
| `frame` | 分组/框架元素 |

## 项目配色方案（多彩低饱和度）

| 颜色系 | 边框色 | 背景色 | 语义 |
|--------|--------|--------|------|
| 紫色系 | `#7c3aed` | `#faf5ff` | 核心概念、架构组件 |
| 绿色系 | `#059669` | `#ecfdf5` | 成功状态、正向流程、调度器 |
| 蓝色系 | `#0ea5e9` | `#f0f9ff` | 数据容器、任务队列 |
| 青色系 | `#0891b2` | `#f0fdff` | 次要元素、辅助功能 |
| 橙色系 | `#ea580c` | `#fff7ed` | 执行阶段、动作操作 |
| 红色系 | `#dc2626` | `#fef2f2` | 重要提示、优先级 |
| 黄色系 | `#ca8a04` | `#fefce8` | 特殊处理、工作循环 |
| 靛蓝系 | `#6366f1` | `#f5f3ff` | 任务项、组件单元 |

- 文本颜色统一使用 `#374151`（gray-700）
- 边框宽度统一使用 `strokeWidth: 2`
- 关键路径用实线，次要连接用虚线

## 文本元素

```json
{
  "type": "text",
  "text": "内容",
  "fontSize": 20,
  "fontFamily": 5,
  "textAlign": "center",
  "verticalAlign": "middle",
  "containerId": null,
  "originalText": "内容",
  "autoResize": true,
  "lineHeight": 1.25
}
```

| 属性 | 值 |
|------|-----|
| `fontFamily` | `5` ExcalFont（默认且优先），`2` Helvetica（仅用户明确要求专业排版），`3` Cascadia（仅代码标注且用户明确要求），`1` Virgil（仅用户明确要求休闲风） |
| `fontSize` | 标题 28-36，节标题 24，标签 20，描述 16，注释 14 |
| `textAlign` | `"left"`, `"center"`, `"right"` |
| `verticalAlign` | `"top"`, `"middle"` |

## 箭头元素

```json
{
  "type": "arrow",
  "points": [[0, 0], [200, 0]],
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "startBinding": { "elementId": "rect-1", "focus": 0, "gap": 5 },
  "endBinding": { "elementId": "rect-2", "focus": 0, "gap": 5 }
}
```

- `points` 第一个点始终为 `[0, 0]`，后续点相对于元素 x/y
- `width`/`height` 必须匹配 points 的边界框
- 箭头类型：`null`, `"arrow"`, `"bar"`, `"dot"`, `"triangle"`
- 绑定箭头时，被绑定的形状也要在 `boundElements` 中声明

## 绑定关系（双向维护）

**形状绑定文本：** 形状元素的 `boundElements` 需包含文本元素ID，文本元素的 `containerId` 需指向形状元素ID。

```json
{
  "id": "rect-1",
  "boundElements": [{ "id": "text-1", "type": "text" }]
}
```

```json
{
  "id": "text-1",
  "containerId": "rect-1"
}
```

**形状绑定箭头：** 形状元素的 `boundElements` 需包含箭头元素ID，箭头元素的 `startBinding` 或 `endBinding` 需指向形状元素ID。

```json
{
  "id": "rect-1",
  "boundElements": [{ "id": "arrow-1", "type": "arrow" }]
}
```

```json
{
  "id": "arrow-1",
  "startBinding": { "elementId": "rect-1", "focus": 0, "gap": 5 }
}
```

## 样式属性速查

| 属性 | 值 |
|------|-----|
| `fillStyle` | `"solid"`, `"hachure"`, `"cross-hatch"` |
| `strokeWidth` | `1`（细），`2`（中），`4`（粗） |
| `strokeStyle` | `"solid"`, `"dashed"`, `"dotted"` |
| `roughness` | `0`（精确），`1`（微手绘），`2`（草图） |
| `roundness` | `{ "type": 3 }` 圆角，`null` 直角 |

## 图表类型速查

| 类型 | 关键形状 | 流向 |
|------|---------|------|
| 流程图 | rectangle + diamond | 上→下 |
| 序列图 | rectangle + line(dashed) + arrow | 左→右时间 |
| 架构图 | rectangle 分层 | 上→下 |
| 思维导图 | ellipse + line | 中心→外 |
| 数据流图 | ellipse + rectangle + arrow | 各种 |
| ERD | rectangle + line | 无固定 |

## 关键规则

1. 每个元素的 `id` 和 `seed` 必须全局唯一
2. 使用描述性 ID 前缀：`rect-`、`text-`、`arrow-`、`diamond-`
3. 元素间距保持 50-100px
4. 所有文本默认使用 `fontFamily: 5`；未收到明确字体要求时，不要切换到 `1/2/3`
5. 实线箭头表示主流程，虚线箭头表示响应/异步
6. 绑定关系必须双向维护（形状的 boundElements 和箭头/文本的 binding/containerId）
7. **不要生成 `index` 字段（避免 invalid order key）**
8. `arrow/line` 的 `points` 第一个点必须是 `[0, 0]`，并保持 `width/height` 与 points 边界一致
9. 文件存放在 `docs/public/diagrams/` 目录，按模块分类

## 交付前自检

在输出 `.excalidraw` 前，至少检查：

1. JSON 可解析。
2. 元素 `id` 唯一。
3. 不包含任何元素级 `index` 字段。
4. 所有 `arrow/line` 元素 `points[0] === [0,0]`。
5. 所有 `text` 元素默认 `fontFamily === 5`（除非用户明确指定其他字体）。
6. 所有 `frameId`（若存在）都指向有效 frame。

若用户反馈 `invalid order key`：

1. 删除全文件元素 `index` 字段。
2. 保持其余几何参数不变后重新保存。
3. 再次执行自检后交付。

## 参考文档

- **[element-reference.md](element-reference.md)** - 所有元素类型的完整属性参考
- **[diagram-patterns.md](diagram-patterns.md)** - 各类图表的专业模式
- **[examples.md](examples.md)** - 完整可用的 JSON 示例模板
- **[best-practices.md](best-practices.md)** - 设计技巧、配色、排版指南
