import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export const CodePreview = ({
  title,
  content,
  url,
}: {
  title: string;
  content: string;
  url: string;
}) => {
  return (
    <div className="bg-black rounded-xl border border-gray-800 shadow-lg overflow-hidden flex flex-col h-full relative group">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <Link
          href={url}
          className="text-xs font-mono text-gray-400 flex gap-2 items-center"
          target="_blank"
        >
          {title}
          <SquareArrowOutUpRight size='12' />
        </Link>
      </div>
      <div className="p-4 overflow-auto font-mono text-xs text-blue-300">
        <pre className="opacity-100 transition-opacity duration-300">
          {content}
        </pre>
      </div>
    </div>
  );
};
