import { PopoverClose, PopoverCloseProps } from "radix-ui/popover";

export function DropdownItem({ children }: PopoverCloseProps) {
	return <PopoverClose asChild>{children}</PopoverClose>;
}
