import { DropdownMenu } from "radix-ui";
import {
	DropdownMenuContent,
	DropdownMenuContentProps,
	DropdownMenuItem,
	DropdownMenuItemProps,
	DropdownMenuSubContent,
	DropdownMenuSubContentProps,
	DropdownMenuSubTriggerProps,
	DropdownMenuTrigger,
	DropdownMenuTriggerProps,
} from "radix-ui/dropdown-menu";
import { ReactNode } from "react";

function Dropdown({ children }: { children: ReactNode }) {
	return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

function DropdownTrigger({ ...props }: DropdownMenuTriggerProps) {
	return <DropdownMenuTrigger {...props} />;
}

function DropdownSubTrigger({ ...props }: DropdownMenuSubTriggerProps) {
	return <DropdownSubTrigger {...props} />;
}

function DropdownBox({ ...props }: DropdownMenuContentProps) {
	return (
		<DropdownMenuContent
			className="border rounded-md p-1 flex flex-col bg-surface m-1 transition-all duration-300"
			{...props}
		/>
	);
}

function DropdownSubBox({ ...props }: DropdownMenuSubContentProps) {
	<DropdownMenuSubContent {...props} />;
}

function DropdownItem({ ...props }: DropdownMenuItemProps) {
	return (
		<DropdownMenuItem
			className="btn w-full border-0 outline-0 min-w-40 hover:bg-background/80 text-sm [&_svg]:size-5 py-1 px-2 h-8 hover:text-primary transition-all duration-300"
			{...props}
		/>
	);
}

export {
	Dropdown,
	DropdownTrigger,
	DropdownSubTrigger,
	DropdownBox,
	DropdownSubBox,
	DropdownItem,
};
