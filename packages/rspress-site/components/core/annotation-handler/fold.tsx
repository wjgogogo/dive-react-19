import React from "react";
import { AnnotationHandler, InlineAnnotation } from "codehike/code";

export const fold: AnnotationHandler<InlineAnnotation> = {
  name: "fold",
  Inline: ({ annotation, children }) => {
    const [folded, setFolded] = React.useState(true);
    if (folded) {
      return (
        <button
          onClick={() => setFolded(false)}
          className="mx-0.5 rounded bg-gray-200 px-1 py-0.5 text-xs text-gray-600 transition-colors hover:bg-gray-300 hover:text-gray-800 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
          title="点击展开折叠内容"
        >
          ...
        </button>
      );
    }

    return (
      <button
        onClick={() => setFolded(true)}
        className="mx-0.5 rounded transition-colors hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
        title="点击折叠内容"
      >
        {children}
      </button>
    );
  }
};
