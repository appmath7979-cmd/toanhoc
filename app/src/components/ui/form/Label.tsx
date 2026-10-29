import type { ComponentProps } from "react";
import { cn } from "@/libs/utils/cn";

export default function Label({
  children,
  className,
  htmlFor,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("font-semibold text-sm", className)}
      {...props}
    >
      {children}
    </label>
  );
}
