import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";

// 内联 SVG 图标组件
const MinusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const diff: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  transform: (annotation) => {
    const color = annotation.query === "-" ? "#f85149" : "#3fb950";
    return [annotation, { ...annotation, name: "mark", query: color }];
  },
  Line: ({ annotation, ...props }) => {
    const isDeletion = annotation?.query === "-";
    const isAddition = annotation?.query === "+";
    
    if (!isDeletion && !isAddition) {
      return <InnerLine merge={props} />;
    }

    return (
      <div className="flex items-center">
        <div className="flex w-6 shrink-0 items-center justify-center">
          {isDeletion && (
            <MinusIcon 
              className="h-4 w-4 text-red-500" 
              aria-label="删除的行"
            />
          )}
          {isAddition && (
            <PlusIcon 
              className="h-4 w-4 text-green-500" 
              aria-label="新增的行"
            />
          )}
        </div>
        <div className="flex-1">
          <InnerLine merge={props} />
        </div>
      </div>
    );
  },
};