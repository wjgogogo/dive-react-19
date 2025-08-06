import React from "react";
import { AnnotationHandler } from "codehike/code";

export const link: AnnotationHandler = {
  name: "link",
  Inline: ({ annotation, ...props }) => (
    <a
      {...props}
      href={annotation.query}
      className={
        "inline-flex items-center gap-1 rounded-md bg-blue-50 px-1 py-0.5 text-blue-700 underline decoration-blue-400 underline-offset-2 transition-all hover:bg-blue-100 hover:text-blue-800 hover:decoration-blue-600 dark:bg-blue-950 dark:text-blue-300 dark:decoration-blue-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
      <svg
        className="h-3 w-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  )
};
