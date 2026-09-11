import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
	outline: "btn-icon--outline",
	ghost: "btn-icon--ghost",
};

interface IconButtonProps extends ComponentProps<"button"> {
	variant?: keyof typeof variants;
}

export function IconButton({
	variant = "outline",
	children,
	className,
	...props
}: IconButtonProps) {
	return (
		<button
			type="button"
			className={cn("btn-icon", variants[variant], className)}
			{...props}
		>
			{children}
		</button>
	);
}
