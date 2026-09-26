import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

interface InputProps {}

export default function Input({
	className,
	...props
}: InputProps & ComponentProps<"input">) {
	return <input className={cn("input smooth", className)} {...props} />;
}
