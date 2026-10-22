import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/libs/utils/cn";

const directions = {
  horizontal: "",
  "horizontal-reverse": "",
  vertical: "flex-col",
  "vertical-reverse": "",
};

interface FlexProps extends ComponentProps<"div"> {
  direction?: keyof typeof directions;
  className?: string;
  children: ReactNode;
  display?: "none" | "inline-flex" | "flex";
  justify?:
    "justify-start" | "justify-center" | "justify-end" | "justify-between";
}

export default function Flex({
  direction = "horizontal",
  className,
  display = "flex",
  justify = "start",
  children,
}: FlexProps) {
  return (
    <div
      className={cn(
        "items-center",
        display,
        justify,
        directions[direction],
        className,
      )}
    >
      {children}
    </div>
  );
}
