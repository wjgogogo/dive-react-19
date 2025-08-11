import React, { useRef, useLayoutEffect } from "react";
import {
  AnnotationHandler,
  InnerLine,
  InnerPre,
  getPreRef
} from "codehike/code";

function useScrollToFocus(ref: React.RefObject<HTMLPreElement>) {
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    if (ref.current) {
      const focusedElements = ref.current.querySelectorAll(
        "[data-focus=true]"
      ) as NodeListOf<HTMLElement>;

      const containerRect = ref.current.getBoundingClientRect();
      let top = Infinity;
      let bottom = -Infinity;
      focusedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        top = Math.min(top, rect.top - containerRect.top);
        bottom = Math.max(bottom, rect.bottom - containerRect.top);
      });

      if (bottom > containerRect.height || top < 0) {
        ref.current.scrollTo({
          top: ref.current.scrollTop + top - 10,
          behavior: firstRender.current ? "instant" : "smooth"
        });
      }
      firstRender.current = false;
    }
  });
}

const PreWithFocus: AnnotationHandler["PreWithRef"] = (props) => {
  const ref = getPreRef(props);
  useScrollToFocus(ref);

  return <InnerPre merge={props} />;
};

export const focus: AnnotationHandler = {
  name: "focus",
  onlyIfAnnotated: true,
  PreWithRef: PreWithFocus,
  Line: (props) => (
    <InnerLine
      merge={props}
      className="px-2 opacity-30 transition-opacity duration-300 data-[focus]:opacity-100"
    />
  ),
  AnnotatedLine: ({ annotation, ...props }) => (
    <div className="relative">
      <InnerLine
        merge={props}
        data-focus={true}
        className="bg-blue-100/60 transition-all duration-300 dark:bg-slate-600/50"
      />
    </div>
  )
};
