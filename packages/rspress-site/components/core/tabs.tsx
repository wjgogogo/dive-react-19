import React from "react";
import {
  Tabs as UITabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Coder } from "./coder";
import { extractTabLabel } from "./utils/meta-parser";

export function Tabs(props: unknown) {
  const { tabs = [] } = props.__hike || {};
  if (!tabs || tabs.length === 0) {
    console.warn("没有找到可显示的代码标签页");
    return null;
  }

  const firstTab = tabs[0];
  const defaultValue = extractTabLabel(firstTab.meta);

  return (
    <div className="my-6">
      <UITabs defaultValue={defaultValue} className="w-full gap-0">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 p-0 dark:border-gray-700 dark:bg-gray-800">
          {tabs.map((codeblock) => {
            const label = extractTabLabel(codeblock.meta);
            return (
              <TabsTrigger
                key={label}
                value={label}
                className="flex-shrink-0 rounded-none border-0 bg-transparent px-4 py-2.5! text-sm font-medium text-gray-700! transition-colors hover:bg-gray-100! data-[state=active]:bg-gray-200! data-[state=active]:text-gray-900! dark:text-gray-300! dark:hover:bg-gray-700! dark:data-[state=active]:bg-gray-900! dark:data-[state=active]:text-white!"
              >
                <div className="flex items-center gap-2">
                  <span className="max-w-32 truncate" title={label}>
                    {label}
                  </span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((codeblock) => {
          const label = extractTabLabel(codeblock.meta);
          return (
            <TabsContent key={label} value={label} className="mt-0">
              <Coder codeblock={codeblock} variant="tab" />
            </TabsContent>
          );
        })}
      </UITabs>
    </div>
  );
}

export default Tabs;
