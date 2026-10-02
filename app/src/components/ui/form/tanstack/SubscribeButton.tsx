import { useFormContext } from "@/context/form.context";
import { ButtonProps } from "../../Button";

export default function SubscribeButton({
	variant,
	children,
	setChild = false,
	...props
}: ButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<button type="submit" {...props} disabled={isSubmitting}>
					{children}
				</button>
			)}
		</form.Subscribe>
	);
}
