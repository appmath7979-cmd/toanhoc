import { Popover } from "radix-ui";
import { ReactNode } from "react";

interface DropdownTriggerProps {
	children: ReactNode;
	setChild?: boolean;
}

export function DropdownTrigger({ children, setChild }: DropdownTriggerProps) {
	return <Popover.Trigger asChild={setChild}>{children}</Popover.Trigger>;
}
