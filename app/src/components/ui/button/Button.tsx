import { ComponentProps } from "react";
import { Slot } from "radix-ui";

const variants = {
	primary: "",
	outline: "",
	ghost: "",
};

interface ButtonProps {
	setChild?: boolean;
	variant?: keyof typeof variants;
	danger?: boolean;
}

function Button({
	variant = "primary",
	setChild = false,
	danger = false,
	children,
	...props
}: ButtonProps & ComponentProps<"button">) {
	const Comp = setChild ? Slot.Root : "button";
	return <Comp {...props}>{children}</Comp>;
}

export { Button, type ButtonProps };
