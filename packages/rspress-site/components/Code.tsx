import React from "react";
import { useTheme } from "./hooks/useTheme";
import {remarkCodeHike} from "@code-hike/mdx";
import * as CH from "@code-hike/mdx/components";
import { RawCode } from "codehike/code";

const THEMES = {
  light: "material-lighter",
  dark: "material-palenight"
} as const;

type CodeProps = Parameters<typeof CH.Code>[0];

export const Code = (props: CodeProps) => {
  const theme = useTheme();
  const codeTheme = THEMES[theme];

  // 根据当前主题修改代码块配置，将主题应用到 codeConfig
  const enhancedProps = {
    ...props,
      codeConfig: {
      ...props.codeConfig,
      themeName: codeTheme
    }
  };

  return <CH.Code {...enhancedProps} />;
};

export default Code;
