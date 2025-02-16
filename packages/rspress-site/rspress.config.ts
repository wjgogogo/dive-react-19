import * as path from "path";
import { defineConfig } from "rspress/config";
import { pluginShiki } from "@rspress/plugin-shiki";
import { pluginPreview } from "@rspress/plugin-preview";
import { pluginPlayground } from "@rspress/plugin-playground";

export default defineConfig({
  base: "/dive-react-19/",
  root: path.join(__dirname, "docs"),
  globalStyles: path.join(__dirname, "theme/style.css"),
  title: "React 19",

  description: "React 19 深度源码解读",
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png"
  },
  mediumZoom: {
    selector: ".rspress-doc img"
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/wjgogogo/dive-react-19"
      },
      {
        icon: "wechat",
        mode: "img",
        content: "/dive-react-19/qrcode.png"
      }
    ],
    nav: [
      {
        text: "源码解析",
        link: "/guide/how-to-debug",
        activeMatch: "/guide/"
      }
    ],
    sidebar: {
      "/guide/": [
        { text: "如何调试 React 源码？", link: "/guide/how-to-debug" },
        { text: "什么是 JSX ？", link: "/guide/what-is-jsx" },
        { text: "Scheduler 调度器", link: "/guide/scheduler" },
        { text: "应用初次挂载概览", link: "/guide/initial-mount" }
      ]
    },
    enableAppearanceAnimation: false,
    enableScrollToTop: true,
    lastUpdated: true,
    lastUpdatedText: "最后更新时间",
    outlineTitle: "大纲",
    prevPageText: "上一页",
    nextPageText: "下一页",
    searchPlaceholderText: "搜索文档",
    searchNoResultsText: "未搜索到相关结果",
    searchSuggestedQueryText: "可更换不同的关键字后重试",
    sourceCodeText: "源码"
  },

  markdown: {
    showLineNumbers: true
  },
  plugins: [
    pluginShiki(),
    pluginPreview({
      defaultRenderMode: "pure",
      iframeOptions: {
        position: "fixed"
      }
    })
  ]
});
