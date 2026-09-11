import { Popover } from "radix-ui";
import { PopoverProps } from "radix-ui/popover";

export function Dropdown({ children }: PopoverProps) {
	return <Popover.Root>{children}</Popover.Root>;
}
