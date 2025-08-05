import React, { useEffect, useRef, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { useTheme } from "./hooks/useTheme";
import { ZoomIn, ZoomOut, RotateCcw, Fullscreen } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import "@excalidraw/excalidraw/index.css";
import "./ExcalidrawViewer.css";

interface ExcalidrawViewerProps {
  data: any;
  height?: number;
  width?: number;
}

export const ExcalidrawViewer: React.FC<ExcalidrawViewerProps> = ({
  data,
  height = 400,
  width = "100%"
}) => {
  const theme = useTheme();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  // 自动适应内容大小
  useEffect(() => {
    if (excalidrawAPI && data) {
      const timer = setTimeout(() => {
        try {
          // 获取所有元素的边界框
          const elements = data.elements || [];
          if (elements.length > 0) {
            // 使用 scrollToContent 来自动适应内容
            excalidrawAPI.scrollToContent(elements, {
              fitToContent: true,
              animate: false
            });
          }
        } catch (error) {
          console.warn("自动适应内容失败:", error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [excalidrawAPI, data]);

  // 全局控制功能
  const handleZoomIn = () => {
    if (excalidrawAPI) {
      const appState = excalidrawAPI.getAppState();
      const newZoom = Math.min(appState.zoom.value * 1.2, 3);
      excalidrawAPI.updateScene({
        appState: { zoom: { value: newZoom } }
      });
    }
  };

  const handleZoomOut = () => {
    if (excalidrawAPI) {
      const appState = excalidrawAPI.getAppState();
      const newZoom = Math.max(appState.zoom.value / 1.2, 0.1);
      excalidrawAPI.updateScene({
        appState: { zoom: { value: newZoom } }
      });
    }
  };

  const handleResetView = () => {
    if (excalidrawAPI && data) {
      const elements = data.elements || [];
      if (elements.length > 0) {
        excalidrawAPI.scrollToContent(elements, {
          fitToContent: true,
          animate: true
        });
      } else {
        excalidrawAPI.updateScene({
          appState: {
            zoom: { value: 1 },
            scrollX: 0,
            scrollY: 0
          }
        });
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {excalidrawAPI && (
        <div className={clsx("absolute top-2.5 right-2.5 z-10 flex gap-1")}>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={handleZoomIn}
          >
            <ZoomIn />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={handleZoomOut}
          >
            <ZoomOut />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={handleResetView}
          >
            <Fullscreen />
          </Button>
        </div>
      )}
      <div
        className="excalidraw-viewer"
        style={{
          height: height,
          width: width
        }}
      >
        <Excalidraw
          initialData={{ ...data, scrollToContent: true }}
          viewModeEnabled={true}
          zenModeEnabled={false}
          gridModeEnabled={false}
          theme={theme}
          excalidrawAPI={setExcalidrawAPI}
          UIOptions={{
            canvasActions: {
              loadScene: false,
              export: false,
              saveToActiveFile: false,
              toggleTheme: false
            },
            tools: {
              image: false
            }
          }}
        >
          <MainMenu />
        </Excalidraw>
      </div>
    </div>
  );
};

export default ExcalidrawViewer;
