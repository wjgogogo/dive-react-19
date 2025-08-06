import React from "react";
import clsx from "clsx";
import { AnnotationHandler } from "codehike/code";

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => (
    <div
      {...props}
      className={clsx(
        props.className,
        "relative -ml-2 border-l-4 border-amber-500 from-amber-500/20 to-transparent pl-4 transition-all duration-200 hover:from-amber-500/30"
      )}
    />
  ),
  Inline: ({ annotation, ...props }) => (
    <span
      {...props}
      className={clsx(
        props.className,
        "rounded-md bg-amber-400/25 px-1.5 py-0.5 font-semibold ring-1 ring-amber-400/40 transition-colors hover:bg-amber-400/35"
      )}
    />
  )
};
