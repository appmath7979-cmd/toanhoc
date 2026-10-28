import type { ComponentProps } from "react";
import { cn } from "@/libs/utils/cn";

export default function Label({
  children,
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label className={cn("font-semibold text-sm", className)} {...props}>
      {children}
    </label>
  );
}
