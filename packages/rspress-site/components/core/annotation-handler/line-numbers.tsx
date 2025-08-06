import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1;
    // 为其他处理器提供行号偏移信息
    React.useLayoutEffect(() => {
      if (typeof window !== 'undefined') {
        // 将行号宽度信息存储到全局上下文中，供其他处理器使用
        window.__lineNumberWidth = width;
      }
    }, [width]);
    
    return (
      <div className="flex">
        <span
          className="text-right opacity-50 select-none"
          style={{ minWidth: `${width}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-1 pl-2" />
      </div>
    );
  }
};
