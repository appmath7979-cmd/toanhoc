import { Popover } from "radix-ui";
import { PopoverTriggerProps } from "radix-ui/popover";

export function DropdownTrigger({ children, ...props }: PopoverTriggerProps) {
	return (
		<Popover.Trigger asChild {...props}>
			{children}
		</Popover.Trigger>
	);
}
