import { Slot } from "radix-ui";
import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
	primary: "btn-primary",
	outline: "btn-outline",
};

const sizes = {
	default: "h-8 [&_svg]:size-4.5",
};

interface ButtonProps extends ComponentProps<"button"> {
	setChild?: boolean;
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
}

export function Button({
	variant = "primary",
	size = "default",
	setChild = false,
	children,
	className,
	...props
}: ButtonProps) {
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
