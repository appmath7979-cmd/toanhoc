import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";

const variants = {
	primary: "btn-primary",
	outline: "btn-outline",
};

const sizes = {
	default: "btn-default",
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
	setChild,
	...props
}: ButtonProps & ComponentProps<"button">) {
	const Comp = setChild ? Slot.Root : "button";

	return (
		<Comp
			className={cn("btn", variants[variant], sizes[size], className)}
			{...props}
		>
			{children}
		</Comp>
	);
}
