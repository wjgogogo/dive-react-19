import React, { useEffect, useRef, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { useTheme } from "./hooks/useTheme";
import { ZoomIn, ZoomOut, RotateCcw, Fullscreen, Minimize } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // 全屏相关功能
  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        // 进入全屏
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        // 退出全屏
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.warn("全屏操作失败:", error);
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 全屏状态变化时自动适应内容
  useEffect(() => {
    if (excalidrawAPI && data) {
      const timer = setTimeout(() => {
        try {
          const elements = data.elements || [];
          if (elements.length > 0) {
            excalidrawAPI.scrollToContent(elements, {
              fitToContent: true,
              animate: true
            });
          }
        } catch (error) {
          console.warn("全屏切换时自动适应内容失败:", error);
        }
      }, isFullscreen ? 300 : 100); // 进入全屏需要更多时间等待动画完成

      return () => clearTimeout(timer);
    }
  }, [isFullscreen, excalidrawAPI, data]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden rounded-xl",
        isFullscreen &&
          "fixed inset-0 z-50 rounded-none bg-white dark:bg-gray-900"
      )}
    >
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
            <RotateCcw />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={handleFullscreen}
          >
            {isFullscreen ? <Minimize /> : <Fullscreen />}
          </Button>
        </div>
      )}
      <div
        className="excalidraw-viewer"
        style={{
          height: isFullscreen ? "100vh" : height,
          width: isFullscreen ? "100vw" : width
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
