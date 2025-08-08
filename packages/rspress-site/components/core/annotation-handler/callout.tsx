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
          className="bg-card text-card-foreground relative mt-2 w-fit max-w-md rounded-md border p-1.5 text-sm whitespace-pre-wrap shadow-sm"
        >
          <div
            style={{ left: `${column}ch` }}
            className="bg-card border-border absolute -top-px h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l"
          />
          <div className="flex items-start">{annotation.query}</div>
        </div>
      </>
    );
  }
};
