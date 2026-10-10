import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

export default function Textarea({
	className,
	...props
}: ComponentProps<"textarea">) {
	return <textarea className={cn("", className)} {...props} />;
}
