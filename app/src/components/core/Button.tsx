import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
	primary: "btn-primary",
};

interface ButtonProps extends ComponentProps<"button"> {
	setChild?: boolean;
	variant: keyof typeof variants;
}

export function Button({
	variant = "primary",
	setChild = false,
	className,
	...props
}: ButtonProps) {
	const Comp = setChild ? Slot : "button";

	return (
		<Comp className={cn("btn", variants[variant], className)} {...props}>
			Button
		</Comp>
	);
}
