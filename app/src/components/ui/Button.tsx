import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";

const variants = {
  primary: {
    base: "btn-primary",
    danger: "btn-primary--danger",
  },
  ghost: {
    base: "btn-ghost",
    danger: "btn-ghost--danger",
  },
  outline: {
    base: "btn-outline",
    danger: "btn-outline--danger",
  },
};

const sizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

interface ButtonProps extends ComponentProps<"button"> {
  setChild?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  danger?: boolean;
}

function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  danger = false,
  setChild = false,
  ...props
}: ButtonProps) {
  const Comp = setChild ? Slot.Root : "button";

  return (
    <Comp
      {...props}
      className={cn(
        "btn disabled:opacity-50 disabled:pointer-events-none",
        variants[variant][danger ? "danger" : "base"],
        sizes[size],
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export { Button, type ButtonProps };
