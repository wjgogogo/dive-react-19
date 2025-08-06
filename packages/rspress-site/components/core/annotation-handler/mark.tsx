import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";

const COLOR = "rgb(14 165 233)";

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const color = (annotation?.query as string) || COLOR;
    return (
      <div
        className="relative -ml-2 pl-2 transition-colors duration-200"
        style={{
          borderLeft: "solid 2px transparent",
          borderLeftColor: annotation ? (color as string) : "transparent",
          backgroundColor: annotation
            ? (`rgb(from ${color} r g b / 0.15)` as any)
            : undefined
        }}
      >
        <InnerLine merge={props} />
      </div>
    );
  },
  Inline: ({ annotation, children, ...props }) => {
    const color = (annotation?.query as string) || COLOR;
    return (
      <span
        className="rounded-md px-1 py-0.5"
        style={{
          border: annotation ? `solid 1px ${color}` : undefined,
          backgroundColor: annotation
            ? (`rgb(from ${color} r g b / 0.15)` as any)
            : undefined
        }}
      >
        {children}
      </span>
    );
  }
};
