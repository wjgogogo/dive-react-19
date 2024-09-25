import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
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
      {
        text: "API",
        link: "https://rspress.dev/api/index.html",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "源码解析",
          items: [{ text: "什么是jsx？", link: "/guide/01-what-is-jsx" }],
        },
      ],
    },
  },
});
