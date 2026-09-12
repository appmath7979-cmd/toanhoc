import { cn } from "@/libs/utils/cn";
import { Popover } from "radix-ui";
import { ReactNode } from "react";

interface DropdownContentProps {
	children: ReactNode;
	variant?: "solid" | "glass";
}

export function DropdownContent({
	children,
	variant = "solid",
}: DropdownContentProps) {
	return (
		<Popover.Portal>
			<Popover.Content
				className={cn(
					"border rounded-md shadow-md p-1",
					variant === "solid" &&
						"bg-surface **:hover:bg-gray-300 dark:**:hover:bg-gray-700",
					variant === "glass" &&
						"bg-surface/70 backdrop-blur-md **:hover:bg-gray-200/50 dark:**:hover:bg-gray-800/50",
				)}
			>
				{children}
			</Popover.Content>
		</Popover.Portal>
	);
}
