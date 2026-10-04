import { DropdownMenu } from "radix-ui";
import { ReactNode } from "react";

function Dropdown({ children }: { children: ReactNode }) {
	return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

function DropdownTrigger({ children }: { children: ReactNode }) {
	return <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>;
}

function DropdownContent({ children }: { children: ReactNode }) {
	return (
		<DropdownMenu.Portal>
			<DropdownMenu.Content>{children}</DropdownMenu.Content>
		</DropdownMenu.Portal>
	);
}

function DropdownItem({
	children,
	...props
}: DropdownMenu.DropdownMenuItemProps) {
	return <DropdownMenu.Item {...props}>{children}</DropdownMenu.Item>;
}

function DropdownSeparator() {
	return <DropdownMenu.Separator />;
}

function DropdownLabel({ children }: { children: ReactNode }) {
	return <DropdownMenu.Label>{children}</DropdownMenu.Label>;
}

function DropdownSub({ children }: { children: ReactNode }) {
	return <DropdownMenu.Sub>{children}</DropdownMenu.Sub>;
}

function DropdownSubTrigger({ children }: { children: ReactNode }) {
	return <DropdownMenu.SubTrigger>{children}</DropdownMenu.SubTrigger>;
}

function DropdownSubContent({ children }: { children: ReactNode }) {
	return <DropdownMenu.SubContent>{children}</DropdownMenu.SubContent>;
}

export {
	Dropdown,
	DropdownTrigger,
	DropdownContent,
	DropdownItem,
	DropdownSeparator,
	DropdownLabel,
	DropdownSub,
	DropdownSubTrigger,
	DropdownSubContent,
};
