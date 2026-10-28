import type { ComponentProps } from "react";
import { cn } from "@/libs/utils/cn";

export default function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea className={cn("", className)} {...props} />;
}
