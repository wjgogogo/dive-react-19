# 图表模式

## 流程图

### 符号映射
| 形状 | 含义 | Excalidraw |
|------|------|------------|
| 圆角矩形 | 开始/结束 | `rectangle` + `roundness` |
| 矩形 | 流程/动作 | `rectangle` |
| 菱形 | 决策 | `diamond` |
| 椭圆 | 连接器 | `ellipse` |

### 配色
- 开始/结束：绿色系 `#059669` / `#ecfdf5`
- 流程：蓝色系 `#0ea5e9` / `#f0f9ff`
- 决策：黄色系 `#ca8a04` / `#fefce8`
- 错误：红色系 `#dc2626` / `#fef2f2`

### 泳道流程图
- 用大矩形 `backgroundColor: "transparent"` + `strokeStyle: "dashed"` 做泳道
- 顶部加粗体标题
- 水平箭头跨越泳道边界

---

## 序列图

### 组件
1. 参与者（顶行矩形）：`backgroundColor` 用蓝色系，`roundness: { "type": 3 }`
2. 生命线：`type: "line"`, `strokeStyle: "dashed"`, `strokeWidth: 1`, `roughness: 0`
3. 同步消息：`type: "arrow"`, `strokeStyle: "solid"`
4. 异步/返回消息：`type: "arrow"`, `strokeStyle: "dashed"`
5. 激活框：`type: "rectangle"`, `width: 16`, `backgroundColor: "#e9ecef"`

### 布局
- 参与者间距 200px
- 消息垂直间距 50-80px
- 消息标签放在箭头上方
- 复杂流程编号：`1. 登录`, `2. 验证`

---

## 架构图

### 分层架构
垂直堆叠，层间用颜色区分：
- 表现层：蓝色系 `#0ea5e9` / `#f0f9ff`
- 业务层：绿色系 `#059669` / `#ecfdf5`
- 数据层：紫色系 `#7c3aed` / `#faf5ff`

### 微服务模式
```
客户端 → API 网关 → [服务A, 服务B, 服务C] → [数据库A, 数据库B, 数据库C]
```

### 组件形状
| 组件 | 形状 | 颜色系 |
|------|------|--------|
| 用户/客户端 | ellipse | 蓝色系 |
| 服务/API | rectangle | 绿色系 |
| 数据库 | ellipse | 紫色系 |
| 队列/消息 | rectangle | 黄色系 |
| 外部系统 | rectangle (双边框) | 青色系 |

---

## 思维导图

### 布局
- 中心节点最大（180x100, fontSize 28-36, strokeWidth 4）
- 一级分支（140x70, fontSize 20-24, strokeWidth 2）
- 二级分支（100x50, fontSize 16-18, strokeWidth 2）
- 三级分支（80x40, fontSize 14-16, strokeWidth 1）

### 配色
- 中心：紫色系（核心概念）
- 各分支用不同颜色系区分
- 子节点用父节点的浅色变体

---

## 数据流图

### 符号
| 符号 | 含义 | Excalidraw |
|------|------|------------|
| 圆形 | 流程 | `ellipse` |
| 矩形 | 外部实体 | `rectangle` |
| 箭头 | 数据流 | `arrow` |

### 布局
- 外部实体在边缘
- 流程在中心
- 每个箭头标注数据名称

---

## ERD

### 结构
- 实体用 `rectangle`
- 用 `line` 分割属性区域
- 关系用 `line` 或 `arrow`
- 基数标注：`1`, `N`, `0..1`, `1..*`

---

## 通用规则

### 样式一致性
| 场景 | roughness | fontFamily |
|------|-----------|------------|
| 默认（手写风） | `1` | `5` (ExcalFont) |
| 技术文档（专业风） | `0` | `2` (Helvetica) |
| 头脑风暴（草图风） | `2` | `1` (Virgil) |

### 视觉层次
```
标题 (28-36px)
  └── 主要元素 (20px, 彩色背景)
        └── 次要元素 (16px, 浅色)
              └── 注释 (14px, 灰色)
```

### 箭头约定
| 样式 | 含义 |
|------|------|
| 实线 + 箭头 | 主流程、动作 |
| 虚线 + 箭头 | 响应、返回、异步 |
| 实线无箭头 | 关联、关系 |
| 点线 + 箭头 | 可选、引用 |
| 粗实线 | 关键路径 |
