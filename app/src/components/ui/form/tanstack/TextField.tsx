import { Field, FieldProps } from "../Field";
import { useFieldContext } from "@/context/form.context";

export default function TextField({ ...props }: FieldProps) {
	const field = useFieldContext<string>();

	return (
		<Field
			value={field.state.value}
			onChange={(e) => field.handleChange(e.target.value)}
			onBlur={field.handleBlur}
			{...props}
		/>
	);
}
