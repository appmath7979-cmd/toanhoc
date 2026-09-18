import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";
import Spinner from "../Spinner";

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
	loading?: boolean;
}

export function Button({
	children,
	className,
	variant = "primary",
	size = "default",
	disabled,
	loading = false,
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
				loading && "btn-disable [&_svg:not([aria-label=loading-icon])]:hidden",
				className,
			)}
			{...props}
		>
			{loading ? (
				<>
					<Spinner /> {children}
				</>
			) : (
				children
			)}
		</Comp>
	);
}
