import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

export default function Input({
	className,
	...props
}: ComponentProps<"input">) {
	return (
		<input
			className={cn(
				"placeholder:text-sm font-semibold border outline-0 ring-transparent rounded-md px-2 py-1 bg-surface focus:border-primary focus:ring-primary focus:ring-2 transition-all duration-300",
				className,
			)}
			{...props}
		/>
	);
}
