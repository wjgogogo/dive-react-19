# 元素属性参考

## 通用属性

每个元素必须包含：

```json
{
  "id": "unique-id",
  "type": "rectangle",
  "x": 0, "y": 0,
  "width": 100, "height": 100,
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

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识，用描述性名称如 `"header-box"` |
| `type` | string | 元素类型 |
| `x`, `y` | number | 左上角坐标（像素） |
| `width`, `height` | number | 宽高（像素） |
| `angle` | number | 旋转角度（弧度，0 = 不旋转） |
| `strokeColor` | string | 边框颜色（十六进制） |
| `backgroundColor` | string | 填充颜色（十六进制或 `"transparent"`） |
| `fillStyle` | string | `"solid"`, `"hachure"`, `"cross-hatch"` |
| `strokeWidth` | number | `1`（细），`2`（中），`4`（粗） |
| `strokeStyle` | string | `"solid"`, `"dashed"`, `"dotted"` |
| `roughness` | number | `0`（精确），`1`（微手绘），`2`（草图） |
| `opacity` | number | 0-100 |
| `seed` | number | 手绘渲染随机种子 |
| `version` | number | 元素版本（从 1 开始） |
| `versionNonce` | number | 版本随机数 |
| `isDeleted` | boolean | 软删除标志 |
| `groupIds` | array | 所属组 ID 数组 |
| `boundElements` | array/null | 绑定到此元素的箭头或文本 |
| `link` | string/null | 链接 URL |
| `locked` | boolean | 是否锁定 |

---

## Rectangle

```json
{
  "type": "rectangle",
  "roundness": { "type": 3 }
}
```

- `roundness`: `{ "type": 3 }` 圆角，`null` 直角

## Ellipse

```json
{ "type": "ellipse" }
```

- `width` == `height` 时为正圆

## Diamond

```json
{ "type": "diamond" }
```

- 用于流程图决策节点

## Text

```json
{
  "type": "text",
  "text": "内容",
  "fontSize": 20,
  "fontFamily": 2,
  "textAlign": "center",
  "verticalAlign": "middle",
  "containerId": null,
  "originalText": "内容",
  "autoResize": true,
  "lineHeight": 1.25
}
```

| 属性 | 说明 |
|------|------|
| `text` | 显示文本，支持 `\n` 换行 |
| `fontSize` | 常用：`14`, `16`, `20`, `24`, `28`, `36` |
| `fontFamily` | `1` Virgil, `2` Helvetica, `3` Cascadia |
| `textAlign` | `"left"`, `"center"`, `"right"` |
| `verticalAlign` | `"top"`, `"middle"` |
| `containerId` | 容器元素 ID（绑定文本时） |
| `originalText` | 原始文本（与 `text` 相同） |
| `autoResize` | 自动调整容器大小 |

## Arrow

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

| 属性 | 说明 |
|------|------|
| `points` | 相对于元素 x/y 的点数组，第一个点始终 `[0,0]` |
| `startArrowhead` / `endArrowhead` | `null`, `"arrow"`, `"bar"`, `"dot"`, `"triangle"` |
| `startBinding` / `endBinding` | 绑定对象：`elementId`, `focus`(-1~1), `gap` |

点的路径示例：
```
水平: [[0,0], [200,0]]
垂直: [[0,0], [0,150]]
L 形: [[0,0], [100,0], [100,100]]
曲线: [[0,0], [50,-30], [100,0]]
```

`width`/`height` 必须匹配 points 的边界框。

## Line

与 Arrow 相同，但默认无箭头：
```json
{
  "type": "line",
  "points": [[0, 0], [200, 0]],
  "startArrowhead": null,
  "endArrowhead": null
}
```

## Frame

```json
{
  "type": "frame",
  "name": "框架名称"
}
```

子元素需设置 `frameId` 为框架的 ID。

## 绑定关系

形状 + 文本：
```json
// 形状声明绑定
{ "id": "rect-1", "boundElements": [{ "id": "text-1", "type": "text" }] }
// 文本声明容器
{ "id": "text-1", "containerId": "rect-1" }
```

形状 + 箭头：
```json
// 形状声明绑定
{ "id": "rect-1", "boundElements": [{ "id": "arrow-1", "type": "arrow" }] }
// 箭头声明绑定
{ "startBinding": { "elementId": "rect-1", "focus": 0, "gap": 5 } }
```

## 分组

给元素相同的 `groupIds`：
```json
{ "groupIds": ["group-1"] }
```

嵌套组（最内层在前）：
```json
{ "groupIds": ["inner-group", "outer-group"] }
```
