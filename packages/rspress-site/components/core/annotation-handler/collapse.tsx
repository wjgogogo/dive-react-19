import React from "react";
import clsx from "clsx";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "../../ui/collapsible";
import { AnnotationHandler, InnerLine } from "codehike/code";
import { ChevronDown, ChevronRight } from "lucide-react";

export const collapse: AnnotationHandler = {
  name: "collapse",
  transform: (annotation) => {
    const { fromLineNumber, toLineNumber, query } = annotation;

    return [
      annotation,
      {
        ...annotation,
        name: "CollapseTrigger",
        fromLineNumber,
        toLineNumber: fromLineNumber
      },
      {
        ...annotation,
        name: "CollapseContent",
        fromLineNumber: fromLineNumber + 1
      }
    ];
  },
  Block: ({ annotation, children }) => {
    return (
      <Collapsible defaultOpen={annotation.query !== "collapsed"}>
        {children}
      </Collapsible>
    );
  }
};

const icon = (
  <ChevronDown
    className="mb-0.5 inline-block opacity-30 transition select-none group-hover:!opacity-100 group-data-[state=closed]:-rotate-90 group-data-[state=closed]:opacity-80"
    size={15}
  />
);

export const CollapseTrigger: AnnotationHandler = {
  name: "CollapseTrigger",
  onlyIfAnnotated: true,
  AnnotatedLine: ({ annotation, ...props }) => (
    <CollapsibleTrigger className="group contents">
      <InnerLine merge={props} data={{ icon }} />
    </CollapsibleTrigger>
  ),
  Line: (props) => {
    const icon = props.data?.icon as React.ReactNode;
    return (
      <div className="table-row">
        <span className="table-cell w-5 text-center">{icon}</span>
        <div className="table-cell">
          <InnerLine merge={props} />
        </div>
      </div>
    );
  }
};

export const CollapseContent: AnnotationHandler = {
  name: "CollapseContent",
  Block: CollapsibleContent
};
