import type { ComponentProps } from "react";
import { cn } from "@/libs/utils/cn";
import Input from "./Input";
import Label from "./Label";

interface FieldProps extends ComponentProps<"input"> {
  label?: string;
  direction?: "horizontal" | "vertical";
  labelPos?: "before" | "after";
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
}

function Field({
  label,
  error,
  direction = "vertical",
  labelPos = "before",
  labelClassName,
  inputClassName,
  className,
  ...props
}: FieldProps) {
  const flexDirection = [
    "flex",
    direction === "vertical" && "col",
    direction === "vertical" && labelPos === "after" && "reverse",
  ];
  return (
    <div className={cn("gap-2", flexDirection, className)}>
      <Label className={labelClassName}>
        <p>{label}</p>
        <Input {...props} className={inputClassName} />
      </Label>
      <em>{error}</em>
    </div>
  );
}

export { Field, type FieldProps };
