import { ComponentProps } from "react";
import Label from "./Label";
import Input from "./Input";
import Field from "./Field";
import { useFieldContext } from "@/context/form.context";

interface TextFieldProps {
	label: string;
}

export default function TextField({
	label,
	id,
	...props
}: TextFieldProps & ComponentProps<"input">) {
	const field = useFieldContext<string>();

	return (
		<Field>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				{...props}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
			/>
			{
				<em>
					{field.state.meta.errorMap.onChange
						? field.state.meta.errorMap.onChange[0].message
						: null}
				</em>
			}
		</Field>
	);
}
