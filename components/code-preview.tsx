import React from "react";

export const CodePreview = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="bg-black rounded-xl border border-gray-800 shadow-lg overflow-hidden flex flex-col h-full relative group">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <span className="text-xs font-mono text-gray-400">{title}</span>
      </div>
      <div className="p-4 overflow-auto font-mono text-xs text-blue-300">
        <pre className="opacity-100 transition-opacity duration-300">
          {content}
        </pre>
      </div>
    </div>
  );
};
