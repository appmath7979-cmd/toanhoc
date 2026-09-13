import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

export default function Input({
	className,
	...props
}: ComponentProps<"input">) {
	return <input className={cn("input", className)} {...props} />;
}
