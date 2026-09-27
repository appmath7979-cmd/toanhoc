import { RadioGroup } from "radix-ui";
import Label from "./Label";
import { cn } from "@/libs/utils/cn";
import Box from "../layouts/Box";
import { useState } from "react";

interface RadioItemProps {
	id: string;
	label: string;
	value: string;
	description?: string;
}

interface RadioProps {
	defaultValue?: string;
	values: RadioItemProps[];
	variant?: "default" | "box";
	onChange: (value: string) => void;
	direction?: "horizontal" | "vertical";
}

function Radio({
	defaultValue,
	values,
	onChange,
	variant,
	direction = "vertical",
}: RadioProps) {
	const [selected, setSelected] = useState<string | undefined>(defaultValue);
	return (
		<RadioGroup.Root
			defaultValue={defaultValue}
			className={cn(
				"flex flex-col gap-y-2 gap-x-4",
				direction === "horizontal" &&
					"flex-row items-center justify-start *:w-fit",
				variant === "box" && "flex-col md:flex-row",
			)}
		>
			{values.map((value) => (
				<Box
					mode="container"
					key={value.id}
					className={cn(
						"",
						variant === "box" &&
							"flex items-center gap-4 border p-2 rounded-md border-border smooth",
						variant === "box" &&
							selected === value.value &&
							"border-primary bg-primary/10",
					)}
				>
					<Box mode="container" className={cn("flex flex-col gap-2")}>
						<Label htmlFor={value.id} onClick={() => setSelected(value.value)}>
							<Box mode="container" className="flex items-center gap-1.5">
								<RadioGroup.Item
									id={value.id}
									className={cn(
										"relative size-4 rounded-full border border-border shadow-xs smooth",
										selected === value.value && "border-primary",
									)}
									value={value.value}
									onChange={(e) => onChange(e.target.value)}
								>
									<RadioGroup.Indicator
										className={
											"flex size-full items-center justify-center relative before:absolute before:size-3 before:bg-primary before:rounded-full before:top-1/2 before:left-1/2 before:-translate-1/2"
										}
									/>
								</RadioGroup.Item>
								<p>{value.label}</p>
							</Box>
							{variant === "box" && value.description ? (
								<p className="text-accent-foreground text-sm font-semibold ps-5.5">
									{value.description}
								</p>
							) : null}
						</Label>
					</Box>
				</Box>
			))}
		</RadioGroup.Root>
	);
}

export { Radio, type RadioItemProps };
