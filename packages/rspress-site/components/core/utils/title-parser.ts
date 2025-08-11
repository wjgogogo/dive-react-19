/**
 * 从 meta 字符串中提取标题
 */
export function extractTitleFromMeta(meta?: string): string | undefined {
  if (!meta) return undefined;
  
  const titleMatch = meta
    .split(" ")
    .find((item) => item.startsWith('title="'));
    
  if (titleMatch) {
    return titleMatch.replace(/title="(.+)"/, "$1");
  }
  
  return undefined;
}

/**
 * 从 meta 字符串中提取标签名称，支持多种格式
 */
export function extractTabLabelFromMeta(meta?: string): string {
  if (!meta) return "Code";
  
  // 支持 "!!tabs filename" 格式
  const tabsMatch = meta.match(/!!tabs\s+(.+)/);
  if (tabsMatch) {
    return tabsMatch[1].trim();
  }
  
  // 支持 "filename" 格式
  const parts = meta.split(" ");
  return parts[parts.length - 1] || "Code";
}