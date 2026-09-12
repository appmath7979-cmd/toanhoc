import { Popover } from "radix-ui";
import { ReactNode } from "react";

interface DropdownProps {
	children: ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
	return <Popover.Root>{children}</Popover.Root>;
}
