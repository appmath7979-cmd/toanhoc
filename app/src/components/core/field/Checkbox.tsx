import { cn } from "@/libs/utils/cn";
import { CheckIcon } from "lucide-react";
import { Checkbox as C } from "radix-ui";
import { CheckboxProps } from "radix-ui/checkbox";

export default function Checkbox({
	className,
	checked,
	...props
}: CheckboxProps) {
	console.log(checked);
	return (
		<C.Root
			{...props}
			className={cn(
				"bg-background size-3.5 rounded-xs flex justify-center items-center shadow-xs border hover:bg-white/5 transition-colors duration-75",
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
