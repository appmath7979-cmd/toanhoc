import { RadioGroup } from "radix-ui";
import Label from "./Label";
import { ReactNode } from "react";
import { cn } from "@/libs/utils/cn";

function Radio({
	children,
	defaultValue,
	onValueChange,
	value,
}: {
	children: ReactNode;
	defaultValue: string;
	value: string;
	onValueChange?: (val: string) => void;
}) {
	return (
		<RadioGroup.Root
			value={value}
			defaultValue={defaultValue}
			onValueChange={onValueChange}
			className="flex gap-4"
		>
			{children}
		</RadioGroup.Root>
	);
}

function RadioItem({
	label,
	value,
	className,
	description,
	isBox = false,
}: {
	label: string;
	value: string;
	className?: string;
	description?: string;
	isBox?: boolean;
}) {
	return (
		<Label
			className={cn(
				"flex flex-col gap-2 transition-colors duration-300",
				isBox && "radio-box",
				className,
			)}
		>
			<div className={cn("flex items-center gap-2")}>
				<RadioGroup.Item
					value={value}
					className="relative size-4 rounded-full bg-white border"
				>
					<RadioGroup.Indicator className="size-full flex justify-center items-center before:size-2.5 before:block before:rounded-full before:bg-primary" />
				</RadioGroup.Item>
				<p>{label}</p>
			</div>
			<p className="text-xs text-muted-foreground">{description}</p>
		</Label>
	);
}

export { Radio, RadioItem };
