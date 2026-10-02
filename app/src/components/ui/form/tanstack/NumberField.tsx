import { Field, FieldProps } from "../Field";
import { useFieldContext } from "@/context/form.context";

export default function NumberField({ ...props }: FieldProps) {
	const field = useFieldContext<number>();

	return (
		<Field
			value={field.state.value}
			onChange={(e) => field.handleChange(Number(e.target.value))}
			onBlur={field.handleBlur}
			error={
				field.state.meta.errorMap.onChange?.[0]?.message ??
				field.state.meta.errorMap.onBlur?.[0]?.message
			}
			{...props}
		/>
	);
}
