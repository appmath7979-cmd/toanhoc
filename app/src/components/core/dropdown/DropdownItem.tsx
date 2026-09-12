import { cn } from "@/libs/utils/cn";
import { Popover } from "radix-ui";
import { PopoverCloseProps } from "radix-ui/popover";
import { ReactNode } from "react";

interface DropdownItemProps {
	children: ReactNode;
	setChild?: boolean;
	destructive?: boolean;
}

export function DropdownItem({
	children,
	setChild,
	destructive,
	...props
}: DropdownItemProps & PopoverCloseProps) {
	return (
		<Popover.Close
			className={cn(
				"text-sm font-medium px-4 py-1 rounded-md transition-all duration-300",
				destructive &&
					"bg-surface text-status-danger hover:bg-status-danger/20!",
			)}
			{...props}
			asChild={setChild}
		>
			{children}
		</Popover.Close>
	);
}
