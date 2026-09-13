import { ComponentProps, ReactNode } from "react";
import { IconButton } from "../button/IconButton";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { TooltipContent } from "../tootltip/Tooltip";

function Sidebar({ children }: { children: ReactNode }) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);

	return (
		<aside
			className={cn(
				"h-dvh shadow-md bg-surface flex flex-col",
				isExpand && "rounded-r-md",
			)}
		>
			{children}
		</aside>
	);
}

function SidebarTrigger() {
	const [isExpand, { setExpand }] = useAppStore(
		store.sidebar,
		(s) => s.isExpand,
	);

	return (
		<IconButton size="sm" onClick={setExpand}>
			{isExpand ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
		</IconButton>
	);
}

function SidebarMenuItem({
	children,
	setChild,
	danger,
	tooltip,
	...props
}: {
	setChild?: boolean;
	danger?: boolean;
	tooltip?: string;
} & ComponentProps<"button">) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);

	const Comp = setChild ? Slot.Root : "button";

	return (
		<TooltipContent content={!tooltip || isExpand ? "" : tooltip} side="right">
			<Comp
				className={cn(
					"hover:bg-secondary-accent text-xs [&>svg]:size-4.5",
					isExpand
						? "btn btn-default w-full"
						: "btn-icon btn-icon--default size-10 [&>:not(svg)]:hidden",
					danger && "text-danger hover:bg-danger-accent",
				)}
				{...props}
			>
				{children}
			</Comp>
		</TooltipContent>
	);
}

function SidebarMenu({ children }: { children: ReactNode }) {
	return <div className="w-full my-1">{children}</div>;
}

function SidebarGroup({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	return (
		<div
			className={cn(
				"w-full flex flex-col",
				isExpand && "p-2 [&_div]:border-l [&_div]:px-0",
			)}
		>
			{isExpand ? (
				<p className="font-semibold text-muted-foreground truncate tracking-wide text-[11px] uppercase">
					{title}
				</p>
			) : null}
			{children}
		</div>
	);
}

function SidebarContent({ children }: { children: ReactNode }) {
	return <div className="h-full w-full">{children}</div>;
}

function SidebarFooter({ children }: { children: ReactNode }) {
	return <div className="border-t">{children}</div>;
}

export {
	Sidebar,
	SidebarTrigger,
	SidebarMenuItem,
	SidebarMenu,
	SidebarGroup,
	SidebarContent,
	SidebarFooter,
};
