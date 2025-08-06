import React from "react";
import clsx from "clsx";
import { AnnotationHandler } from "codehike/code";

export const focus: AnnotationHandler = {
  name: "focus",
  Line: ({ annotation, ...props }) => (
    <div
      {...props}
      className={clsx(
        props.className,
        "relative -ml-2 border-l-4 border-blue-500 from-blue-500/15 to-transparent pl-4 transition-all duration-200 hover:from-blue-500/25"
      )}
    />
  ),
  Inline: ({ annotation, ...props }) => (
    <span
      {...props}
      className={clsx(
        props.className,
        "rounded-md bg-blue-500/20 px-1.5 py-0.5 ring-1 ring-blue-500/30 transition-colors hover:bg-blue-500/30"
      )}
    />
  )
};
