import React from "react";
import { InlineAnnotation, AnnotationHandler } from "codehike/code";

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation;
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 }
    };
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data;
    // 获取行号宽度偏移量
    const lineNumberWidth =
      typeof window !== "undefined" ? window.__lineNumberWidth || 0 : 0;
    const adjustedColumn = column + lineNumberWidth;

    return (
      <>
        {children}
        <div
          style={{ minWidth: `${adjustedColumn + 4}ch` }}
          className="relative mt-2 -ml-[1ch] w-fit max-w-md rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm whitespace-pre-wrap text-blue-900 shadow-md dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
        >
          <div
            style={{ left: `${adjustedColumn}ch` }}
            className="absolute -top-[1px] h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
          />
          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-500 p-1">
              <svg
                className="h-2 w-2 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="flex-1">{annotation.query}</span>
          </div>
        </div>
      </>
    );
  }
};
