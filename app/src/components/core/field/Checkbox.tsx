import { cn } from "@/libs/utils/cn";
import { CheckIcon } from "lucide-react";
import { Checkbox as C } from "radix-ui";
import { CheckboxProps } from "radix-ui/checkbox";

export default function Checkbox({
	className,
	checked,
	...props
}: CheckboxProps) {
	return (
		<C.Root
			{...props}
			className={cn(
				"checkbox",
				checked && "bg-primary hover:bg-primary/80",
				className,
			)}
		>
			<C.Indicator className="">
				<CheckIcon className="size-2.5 text-foreground" />
			</C.Indicator>
		</C.Root>
	);
}
