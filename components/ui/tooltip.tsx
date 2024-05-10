import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function Tooltip({ className, children, content, ...props }: TooltipProps) {
  return (
    <div className="relative group flex flex-col items-center">
      {children}
      <span
        className={cn(
          "absolute text-sm bg-primary-black shadow-lg border-[1px] border-primary-grey-200 text-gray-400 px-2 py-1 hidden group-hover:block whitespace-nowrap top-10 rounded-lg",
          className
        )}
      >
        {content}
      </span>
    </div>
  );
}

export { Tooltip };
