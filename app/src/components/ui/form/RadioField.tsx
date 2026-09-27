import { useFieldContext } from "@/context/form.context";
import { Radio, RadioItemProps } from "./Radio";

interface RadioFieldProps {
	values: RadioItemProps[];
	defaultValue: string;
	variant?: "default" | "box";
	direction?: "horizontal" | "vertical";
}

export default function RadioField({
	values,
	defaultValue,
	variant = "default",
	direction = "vertical",
}: RadioFieldProps) {
	const field = useFieldContext<string>();

	return (
		<Radio
			values={values}
			defaultValue={defaultValue}
			onChange={field.handleChange}
			variant={variant}
			direction={direction}
		/>
	);
}
