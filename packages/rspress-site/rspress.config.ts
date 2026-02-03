import * as path from "path";
import { defineConfig } from "rspress/config";
import pluginMermaid from "rspress-plugin-mermaid";
import { remarkCodeHike } from "codehike/mdx";

export default defineConfig({
  base: "/dive-react-19/",
  root: path.join(__dirname, "docs"),
  globalStyles: path.join(__dirname, "theme/style.css"),
  title: "React 19 源码解读",
  description: "React 19 深度源码解读",
  icon: "/site/favicon.png",

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
    mdxRs: false,
    globalComponents: [
      path.join(__dirname, "components", "core", "diagram.tsx"),
      path.join(__dirname, "components", "core", "coder.tsx"),
      path.join(__dirname, "components", "core", "tabs.tsx")
    ],
    checkDeadLinks: true,
    remarkPlugins: [
      [
        remarkCodeHike,
        /** @type {import('codehike/mdx').CodeHikeConfig} */
        {
          components: {
            code: "Coder"
          },
          ignoreCode: (codeblock) => codeblock.lang === "mermaid"
        }
      ]
    ]
  },
  plugins: [
    // pluginShiki(),
    // pluginPreview({
    //   defaultRenderMode: "pure",
    //   iframeOptions: {
    //     position: "fixed",
    //     devPort: 8001
    //   }
    // }),
    pluginMermaid()
  ],
  builderConfig: {
    tools: {
      rspack: (config) => {
        config.module?.rules?.push({
          test: /\.excalidraw$/i,
          type: "json"
        });
      },
      source: {
        define: {
          "process.env.__IS_REACT_18__": "true"
        }
      }
    }
  }
});
