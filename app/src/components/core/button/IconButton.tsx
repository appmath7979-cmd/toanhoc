import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

const variants = {
	outline: "btn-icon--outline",
	ghost: "btn-icon--ghost",
};

const sizes = {
	default: "btn-icon--default",
	sm: "btn-icon--sm",
};

interface IconButtonProps {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
}

export function IconButton({
	children,
	className,
	variant = "outline",
	size = "default",
	...props
}: IconButtonProps & ComponentProps<"button">) {
	return (
		<button
			type="button"
			className={cn("btn-icon", variants[variant], sizes[size], className)}
			{...props}
		>
			{children}
		</button>
	);
}
