import { cn } from "@/libs/utils/cn";
import Label from "./Label";
import Input from "./Input";
import { ComponentProps } from "react";

interface FieldProps extends ComponentProps<"input"> {
	label?: string;
	direction?: "horizontal" | "vertical";
	labelPos?: "before" | "after";
}

function Field({
	label,
	direction = "vertical",
	labelPos = "before",
	className,
	...props
}: FieldProps) {
	return (
		<Label className={cn("", className)}>
			<p>{label}</p>
			<Input {...props} />
		</Label>
	);
}

export { Field, type FieldProps };
