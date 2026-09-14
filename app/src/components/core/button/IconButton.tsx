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
	disabled,
	...props
}: IconButtonProps & ComponentProps<"button">) {
	return (
		<button
			type="button"
			disabled={disabled}
			className={cn(
				"btn-icon",
				variants[variant],
				sizes[size],
				disabled && "opacity-40 pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
