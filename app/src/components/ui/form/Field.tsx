import { cn } from "@/libs/utils/cn";
import Label from "./Label";
import Input from "./Input";
import { ComponentProps } from "react";

interface FieldProps extends ComponentProps<"input"> {
	label?: string;
	direction?: "horizontal" | "vertical";
	labelPos?: "before" | "after";
	error?: string;
}

function Field({
	label,
	error,
	direction = "vertical",
	labelPos = "before",
	className,
	...props
}: FieldProps) {
	return (
		<div>
			<Label className={cn("", className)}>
				<p>{label}</p>
				<Input {...props} />
			</Label>
			<em>{error}</em>
		</div>
	);
}

export { Field, type FieldProps };
