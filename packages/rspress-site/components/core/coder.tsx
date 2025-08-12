import React from "react";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";
import { CopyButton } from "./copy-button";
import { extractMaxHeight, extractTitle } from "./utils/meta-parser";
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
import { diff } from "./annotation-handler/diff";
import {
  collapse,
  CollapseTrigger,
  CollapseContent
} from "./annotation-handler/collapse";

const THEMES = {
  light: "material-lighter",
  dark: "material-palenight"
} as const;

export const Coder: React.FC<{
  codeblock: RawCode;
  variant?: "default" | "tab";
}> = ({ codeblock, variant = "default" }) => {
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

  const title = React.useMemo(
    () => extractTitle(codeblock.meta),
    [codeblock.meta]
  );

  const maxHeight = React.useMemo(
    () => extractMaxHeight(codeblock.meta),
    [codeblock.meta]
  );

  const renderTitle = () => {
    return (
      title && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <span
              className="max-w-md truncate text-sm font-medium text-gray-700 dark:text-gray-300"
              title={title}
            >
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
      <div className={clsx("group relative", variant !== "tab" && "my-6")}>
        {renderTitle()}
        <div
          className={clsx(
            "border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900",
            variant === "tab"
              ? "rounded-b-lg border-t-0"
              : title
                ? "rounded-b-lg"
                : "rounded-lg"
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
    <div className={clsx("group relative", variant !== "tab" && "my-6")}>
      {renderTitle()}
      <div className="relative">
        <CopyButton text={highlighted?.code || codeblock.value} />
        <Pre
          code={highlighted}
          handlers={[
            wordWrap,
            callout,
            focus,
            mark,
            link,
            fold,
            className,
            diff,
            collapse,
            CollapseTrigger,
            CollapseContent
          ]}
          className={clsx(
            "overflow-auto border border-gray-200 bg-white p-2 text-sm shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900",
            variant === "tab"
              ? "rounded-b-lg border-t-0"
              : title
                ? "rounded-b-lg"
                : "rounded-lg"
          )}
          style={{
            maxHeight: maxHeight ? `${maxHeight}px` : undefined
          }}
        />
      </div>
    </div>
  );
};

export default Coder;
