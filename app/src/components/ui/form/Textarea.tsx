import type { ComponentProps } from "react";
import { cn } from "@/libs/utils/cn";

export default function Textarea({
  className,
  id,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea id={id} className={cn("w-full", className)} {...props} />;
}
