import React from "react";
import { AnnotationHandler, InlineAnnotation, BlockAnnotation } from "codehike/code";

export const className: AnnotationHandler<InlineAnnotation | BlockAnnotation> = {
  name: "className",
  Block: ({ annotation, children }) => (
    <div className={annotation.query}>{children}</div>
  ),
  Inline: ({ annotation, children }) => (
    <span className={annotation.query}>{children}</span>
  )
};