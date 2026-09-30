import { useFieldContext } from "@/context/form.context";
import { Radio, RadioProps } from "../Radio";

export default function RadioField({
	values,
	className,
	defaultValue,
	direction,
	variant,
}: Omit<RadioProps, "onValueChange">) {
	const field = useFieldContext<string>();

	return (
		<Radio
			onValueChange={field.handleChange}
			values={values}
			defaultValue={defaultValue}
			className={className}
			direction={direction}
			variant={variant}
		/>
	);
}
