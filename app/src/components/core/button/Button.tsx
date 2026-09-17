import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";

const variants = {
	primary: "btn-primary",
	outline: "btn-outline",
	ghost: "btn-ghost",
	danger: "btn-danger",
};

const sizes = {
	default: "btn-default",
	lg: "btn-large",
	xl: "btn-xlarge",
};

interface ButtonProps {
	setChild?: boolean;
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
}

export function Button({
	children,
	className,
	variant = "primary",
	size = "default",
	disabled,
	setChild,
	...props
}: ButtonProps & ComponentProps<"button">) {
	const Comp = setChild ? Slot.Root : "button";

	return (
		<Comp
			disabled={disabled}
			className={cn(
				"btn",
				variants[variant],
				sizes[size],
				disabled && "btn-disable",
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}
