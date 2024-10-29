import * as path from "path";
import { defineConfig } from "rspress/config";
import { pluginShiki } from "@rspress/plugin-shiki";
import { pluginPreview } from "@rspress/plugin-preview";
import { pluginPlayground } from "@rspress/plugin-playground";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  globalStyles: path.join(__dirname, "theme/style.css"),
  title: "Rspress",
  description: "Rspack-based Static Site Generator",
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png",
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/wjgogogo/dive-react-19",
      },
      {
        icon: "wechat",
        mode: "img",
        content: "/qrcode.jpg",
      },
    ],
    nav: [
      {
        text: "源码解析",
        link: "/guide/",
        activeMatch: "/guide/",
      },
    ],
    sidebar: {
      "/guide/": [
        { text: "如何调试 React 源码？", link: "/guide/how-to-debug" },
        { text: "什么是 JSX ？", link: "/guide/what-is-jsx" },
      ],
    },
    lastUpdated: true,
    lastUpdatedText: "最后更新时间",
    outlineTitle: "大纲",
  },

  markdown: {
    showLineNumbers: true,
  },
  plugins: [
    pluginShiki(),
    pluginPreview({
      defaultRenderMode: "pure",
      iframeOptions: {
        position: "fixed",
      },
    }) /*  pluginPlayground() */,
  ],
});
