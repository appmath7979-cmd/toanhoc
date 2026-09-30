import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";

const variants = {
	primary: "",
	ghost: "",
	outline: "",
};

const sizes = {
	sm: "",
	md: "",
	lg: "",
	xl: "",
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
				"disabled:opacity-50 disabled:cursor-not-allowed",
				variant,
				size,
				className,
			)}
		>
			{children}
		</Comp>
	);
}

export { Button, type ButtonProps };
