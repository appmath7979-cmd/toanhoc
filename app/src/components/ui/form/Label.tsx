import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

export default function Label({
	children,
	className,
	...props
}: ComponentProps<"label">) {
	return (
		<label className={cn("font-semibold text-sm", className)} {...props}>
			{children}
		</label>
	);
}
