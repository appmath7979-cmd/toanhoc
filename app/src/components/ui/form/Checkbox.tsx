import { Checkbox as C } from "radix-ui";
import Label from "./Label";
import { CheckIcon } from "lucide-react";

interface CheckboxProps {
	label?: string;
	id?: string;
}

export default function Checkbox({ label, id }: CheckboxProps) {
	return (
		<div>
			<C.Root id={id}>
				<C.Indicator>
					<CheckIcon />
				</C.Indicator>
			</C.Root>
			<Label htmlFor={id}>{label}</Label>
		</div>
	);
}
