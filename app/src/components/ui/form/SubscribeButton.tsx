import { ComponentProps } from "react";
import { Button, type ButtonProps } from "../button/Button";
import { useFormContext } from "@/context/form.context";

export default function SubscribeButton({
	children,
	variant,
	...props
}: ButtonProps & ComponentProps<"button">) {
	const form = useFormContext();

	return (
		<Button type="submit" variant={variant} setChild={true} {...props}>
			<form.Subscribe selector={(state) => state.isSubmitting}>
				{children}
			</form.Subscribe>
		</Button>
	);
}
