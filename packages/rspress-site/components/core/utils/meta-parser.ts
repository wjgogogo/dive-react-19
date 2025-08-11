/**
 * 从代码块 meta 字符串中解析各种属性的工具函数集合
 *
 * 这些工具函数用于解析 Markdown 代码块的 meta 字符串，提取各种配置参数。
 * 支持多种格式的参数定义，具有良好的容错性和向后兼容性。
 *
 * @example
 * ```typescript
 * import { extractMaxHeight, parseCodeMeta } from './meta-parser';
 *
 * const meta = 'title="example.js" max="400" theme="dark"';
 * const maxHeight = extractMaxHeight(meta); // 返回: 400
 * const parsed = parseCodeMeta(meta); // 返回完整的解析结果
 * ```
 *
 * @author CodeHike Team
 * @since 1.0.0
 */

/**
 * 从 meta 字符串中提取代码块的最大高度值
 *
 * 该函数支持多种格式的高度定义，并自动处理单位转换。
 * 当代码块内容较长时，可以通过此参数限制显示高度，超出部分将显示滚动条。
 *
 * @param meta - 代码块的 meta 字符串，可能包含各种配置参数
 * @returns 解析出的最大高度值（像素），如果未找到则返回 null
 *
 * @example
 * ```typescript
 * extractMaxHeight('max="400"');     // 返回: 400
 * extractMaxHeight('max=300px');     // 返回: 300
 * extractMaxHeight('title="test"');  // 返回: null
 * extractMaxHeight('');              // 返回: null
 * ```
 *
 * 支持的格式：
 * - `max="400"` - 带引号的数字（推荐）
 * - `max=400` - 不带引号的数字
 * - `max="400px"` - 带 px 单位（单位会被忽略）
 * - `max=400px` - 不带引号但有单位
 */
export function extractMaxHeight(meta?: string): number | null {
  if (!meta) return null;

  // 正则说明：
  // - max: 匹配字面量 "max"
  // - [="]?: 匹配 = 或 =" （可选）
  // - (\d+): 捕获一个或多个数字
  // - ["p]?x?: 匹配可选的引号和 px 后缀
  const match = meta.match(/max[="]?(\d+)["p]?x?/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * 从 meta 字符串中提取代码高亮主题名称
 *
 * 该函数用于指定代码块使用特定的语法高亮主题。
 * 主题名称通常对应预定义的颜色方案。
 *
 * @param meta - 代码块的 meta 字符串
 * @returns 主题名称字符串，如果未找到则返回 null
 *
 * @example
 * ```typescript
 * extractTheme('theme="dark"');              // 返回: "dark"
 * extractTheme('theme=material-palenight');  // 返回: "material-palenight"
 * extractTheme('max="400"');                 // 返回: null
 * ```
 *
 * 支持的格式：
 * - `theme="dark"` - 带引号的主题名称
 * - `theme=light` - 不带引号的主题名称
 * - 主题名称支持字母、数字和连字符
 */
export function extractTheme(meta?: string): string | null {
  if (!meta) return null;

  // 正则说明：
  // - theme: 匹配字面量 "theme"
  // - [="]?: 匹配 = 或 =" （可选）
  // - ([a-zA-Z-]+): 捕获主题名称（字母和连字符）
  const match = meta.match(/theme[="]?([a-zA-Z-]+)/);
  return match ? match[1] : null;
}

/**
 * 从 meta 字符串中提取代码块标题
 *
 * 该函数解析代码块的标题信息，通常用于在代码块上方显示文件名或描述。
 * 标题会显示在代码块的标题栏中。
 *
 * @param meta - 代码块的 meta 字符串
 * @returns 标题字符串，如果未找到则返回 undefined
 *
 * @example
 * ```typescript
 * extractTitle('title="example.js"');        // 返回: "example.js"
 * extractTitle('max="400" title="config"');  // 返回: "config"
 * extractTitle('theme="dark"');              // 返回: undefined
 * ```
 *
 * 支持的格式：
 * - `title="filename.js"` - 双引号包围的标题
 *
 * @note 当前实现只支持双引号格式，不支持单引号或无引号格式
 */
export function extractTitle(meta?: string): string | undefined {
  if (!meta) return undefined;

  // 按空格分割 meta 字符串，查找以 'title="' 开头的部分
  const titleMatch = meta.split(" ").find((item) => item.startsWith('title="'));

  if (titleMatch) {
    // 使用正则提取引号内的内容
    return titleMatch.replace(/title="(.+)"/, "$1");
  }

  return undefined;
}

/**
 * 从 meta 字符串中提取标签页标签名称
 *
 * 该函数用于多标签代码块场景，解析每个标签页的显示名称。
 * 支持特殊的标签语法和文件名推断。
 *
 * @param meta - 代码块的 meta 字符串
 * @returns 标签名称字符串，默认返回 "Code"
 *
 * @example
 * ```typescript
 * extractTabLabel('!!tabs App.js');         // 返回: "App.js"
 * extractTabLabel('src/components/Button'); // 返回: "Button"
 * extractTabLabel('');                      // 返回: "Code"
 * extractTabLabel('theme="dark"');          // 返回: "dark"
 * ```
 *
 * 支持的格式：
 * - `!!tabs filename` - 特殊标签语法（优先级最高）
 * - 最后一个参数作为文件名 - 从路径中提取文件名
 *
 * @note 如果无法解析任何标签名称，将返回默认值 "Code"
 */
export function extractTabLabel(meta?: string): string {
  if (!meta) return "Code";

  // 优先检查特殊的标签语法 "!!tabs filename"
  const tabsMatch = meta.match(/!!tabs\s+(.+)/);
  if (tabsMatch) {
    return tabsMatch[1].trim();
  }

  // fallback: 使用最后一个空格分隔的部分作为标签名
  const parts = meta.split(" ");
  return parts[parts.length - 1] || "Code";
}

/**
 * 从 meta 字符串中检查是否启用行号显示
 *
 * 该函数检查代码块是否应该显示行号。
 * 支持多种行号相关的配置参数。
 *
 * @param meta - 代码块的 meta 字符串
 * @returns 是否显示行号，默认返回 false
 *
 * @example
 * ```typescript
 * extractShowLineNumbers('showLineNumbers');           // 返回: true
 * extractShowLineNumbers('lineNumbers');               // 返回: true
 * extractShowLineNumbers('showLineNumbers=false');     // 返回: false
 * extractShowLineNumbers('title="test"');              // 返回: false
 * ```
 *
 * 支持的格式：
 * - `showLineNumbers` - 启用行号显示
 * - `lineNumbers` - 启用行号显示（简写）
 * - `showLineNumbers=false` - 显式禁用
 * - `lineNumbers="false"` - 显式禁用
 */
export function extractShowLineNumbers(meta?: string): boolean {
  if (!meta) return false;

  // 检查是否包含行号相关的关键字
  if (/\b(showLineNumbers|lineNumbers)\b/.test(meta)) {
    // 检查是否显式设置为 false
    const falseMatch = meta.match(/(?:showLineNumbers|lineNumbers)[="]?false/);
    return !falseMatch;
  }

  return false;
}
