import { Tooltip as T } from "radix-ui";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <T.Provider delayDuration={300}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Content className="text-sm border border-border rounded-md p-0.5">
          {content}
        </T.Content>
      </T.Root>
    </T.Provider>
  );
}
