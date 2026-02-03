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

    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="relative mt-2 w-fit max-w-md rounded-lg border border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-blue-50/60 p-3 text-sm whitespace-pre-wrap backdrop-blur-md dark:border-slate-600/30 dark:from-slate-800/40 dark:to-slate-700/30"
        >
          <div
            style={{ left: `${column}ch` }}
            className="absolute -top-px h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-blue-50/60 backdrop-blur-md dark:border-slate-600/30 dark:from-slate-800/40 dark:to-slate-700/30"
          />
          <div className="flex items-start text-slate-700/90 dark:text-slate-200/90">
            {annotation.query}
          </div>
        </div>
      </>
    );
  }
};
