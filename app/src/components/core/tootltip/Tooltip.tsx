import { Tooltip as T } from "radix-ui";
import { TooltipTriggerProps } from "radix-ui/tooltip";
import { ReactNode } from "react";

function Tooltip({ children }: { children: ReactNode }) {
  return <T.Root>{children}</T.Root>;
}

function TooltipContent({
  children,
  content,
  side = "top",
  ...props
}: { content: string, side?: "bottom" | "top" | "left" | "right" } & TooltipTriggerProps) {
  return (
    <T.Root>
      <T.Trigger {...props} asChild>
        {children}
      </T.Trigger>
      <T.Portal>
        {!content ? null : (
          <T.Content side={side} className="text-xs p-2 bg-background shadow-md rounded-md m-0.5 transition-all duration-300">
            {content}
            <T.Arrow className="fill-background" />
          </T.Content>
        )}
      </T.Portal>
    </T.Root>
  );
}

export { Tooltip, TooltipContent };
