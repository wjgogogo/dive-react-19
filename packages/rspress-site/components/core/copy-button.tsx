import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className={`group/copy absolute top-1 right-1 z-10 rounded-md border border-gray-700/50 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-gray-200 dark:border-gray-700 dark:text-gray-700 dark:hover:bg-gray-100/10`}
      aria-label={copied ? "已复制到剪贴板" : "复制代码到剪贴板"}
      onClick={handleCopy}
      disabled={copied}
    >
      <div className="flex items-center gap-1 p-1.5">
        {copied ? (
          <Check size={16} className="text-green-400 dark:text-green-600" />
        ) : (
          <Copy size={16} />
        )}
      </div>
    </button>
  );
}
