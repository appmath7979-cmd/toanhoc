import { CheckIcon } from "lucide-react";
import { Checkbox as C } from "radix-ui";
export default function Checkbox() {
	return (
		<C.Root>
			<C.Indicator>
				<CheckIcon />
			</C.Indicator>
		</C.Root>
	);
}
