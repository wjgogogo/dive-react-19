import React from "react";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";
import { CopyButton } from "./copy-button";
import {
  Pre,
  RawCode,
  highlight,
  InlineAnnotation,
  AnnotationHandler,
  InnerLine,
  InnerPre,
  InnerToken
} from "codehike/code";
import { wordWrap } from "./annotation-handler/word-wrap";
import { callout } from "./annotation-handler/callout";
import { focus } from "./annotation-handler/focus";
import { mark } from "./annotation-handler/mark";
import { link } from "./annotation-handler/link";
import { fold } from "./annotation-handler/fold";
import { className } from "./annotation-handler/classname";
import {
  collapse,
  CollapseTrigger,
  CollapseContent
} from "./annotation-handler/collapse";

const THEMES = {
  light: "material-lighter",
  dark: "material-palenight"
} as const;

export const Coder: React.FC<{ codeblock: RawCode }> = ({ codeblock }) => {
  const theme = useTheme();
  const [highlighted, setHighlighted] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const highlightCode = async () => {
      setIsLoading(true);
      try {
        const result = await highlight(codeblock, THEMES[theme]);
        setHighlighted(result);
      } catch (error) {
        console.error("Code highlighting error:", error);
        setHighlighted({
          code: codeblock.value,
          lang: codeblock.lang,
          meta: codeblock.meta
        });
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [codeblock, theme]);

  // 代码块标题和选项（从 meta 中提取）
  const title = codeblock.meta
    ?.split(" ")
    .find((item) => item.startsWith('title="'))
    ?.replace(/title="(.+)"/, "$1");

  const startLine = React.useMemo(() => {
    const match = codeblock.meta?.match(/startLine=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }, [codeblock.meta]);

  const renderTitle = () => {
    return (
      title && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </span>
            {codeblock.lang && (
              <pre className="rounded bg-gray-200 px-2 py-0.5 font-mono text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                {codeblock.lang}
              </pre>
            )}
          </div>
        </div>
      )
    );
  };

  if (isLoading) {
    return (
      <div className="group relative my-6">
        {renderTitle()}
        <div
          className={clsx(
            "border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900",
            title ? "rounded-b-lg" : "rounded-lg"
          )}
        >
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              代码高亮中...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative my-6">
      {renderTitle()}
      <div className="relative">
        <CopyButton text={highlighted?.code || codeblock.value} />
        <Pre
          code={highlighted}
          handlers={[
            wordWrap,
            callout,
            mark,
            link,
            fold,
            className,
            collapse,
            CollapseTrigger,
            CollapseContent
          ]}
          className={clsx(
            "overflow-auto border border-gray-200 bg-white p-4 text-sm shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900",
            title ? "rounded-b-lg" : "rounded-lg"
          )}
        />
      </div>
    </div>
  );
};

export default Coder;
