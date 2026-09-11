import { Popover } from "radix-ui";
import { PopoverContentProps, PopoverPortalProps } from "radix-ui/popover";

export function DropdownContent({ children, ...props }: PopoverPortalProps) {
	return (
		<Popover.Portal {...props}>
			<DropdownContentChild>{children}</DropdownContentChild>
		</Popover.Portal>
	);
}

export function DropdownContentChild({
	children,
	...props
}: PopoverContentProps) {
	return (
		<Popover.Content
			className="border border-border rounded-md flex flex-col **:border-0 text-sm p-1 bg-surface m-0.5"
			{...props}
		>
			{children}
		</Popover.Content>
	);
}
