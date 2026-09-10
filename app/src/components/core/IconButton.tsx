import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
	outline: "btn-icon--outline",
};

interface IconButtonProps extends ComponentProps<"button"> {
	variant?: keyof typeof variants;
}

export function IconButton({
	variant = "outline",
	children,
	className,
}: IconButtonProps) {
	return (
		<button type="button" className={cn("btn-icon", variants[variant], className)}>
			{children}
		</button>
	);
}
