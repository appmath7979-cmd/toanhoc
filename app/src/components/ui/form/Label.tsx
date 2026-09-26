import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

export default function Label({
	className,
	children,
	...props
}: ComponentProps<"label">) {
	return (
		<label className={cn("text-sm font-medium", className)} {...props}>
			{children}
		</label>
	);
}
