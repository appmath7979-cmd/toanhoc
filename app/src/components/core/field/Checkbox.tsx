import { cn } from "@/libs/utils/cn";
import { CheckIcon } from "lucide-react";
import { Checkbox as C } from "radix-ui";
import { CheckboxProps } from "radix-ui/checkbox";

export default function Checkbox({
	className,
	checked,
	onCheckedChange,
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
			onCheckedChange={(val) =>
				onCheckedChange === undefined ? false : onCheckedChange(val)
			}
		>
			<CheckIcon className="size-2.5 text-background" />
			<C.Indicator>
				<CheckIcon className="size-2.5 text-background" />
			</C.Indicator>
		</C.Root>
	);
}
