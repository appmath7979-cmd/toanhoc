import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { IconButton } from "../button/IconButton";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import { Slot } from "radix-ui";
import { TooltipContent } from "../tootltip/Tooltip";
import { useMobile } from "@/hooks/use-mobile";

function Sidebar({ children }: { children: ReactNode }) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	const isMobile = useMobile();

	return (
		<aside
			className={cn(
				"h-dvh shadow-md bg-surface flex flex-col",
				isMobile && !isExpand && "w-0! overflow-hidden",
				isExpand && "rounded-r-md",
				isMobile && isExpand && "fixed left-0 w-80 z-9999",
			)}
		>
			{children}
			{isMobile && isExpand && (
				<div className="size-full absolute bg-background/80 left-full backdrop-blur-xs" />
			)}
		</aside>
	);
}

function SidebarHeader({ children }: { children: ReactNode }) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	const isMobile = useMobile();

	return (
		<div className="p-2 flex flex-col">
			<div className="ms-auto">
				{isMobile && isExpand && <SidebarTrigger />}
			</div>
			<div className="btn-icon">{children}</div>
		</div>
	);
}

function SidebarTitle({
	isHeading = true,
	content,
	className,
}: {
	isHeading?: boolean;
	content: string;
	className?: string;
}) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	const [title, setTitle] = useState<string>("");

	const Comp = isHeading ? "h1" : "p";

	useEffect(() => {
		if (isExpand) setTitle(content);
		else {
			const getCurrentTitle = content.charAt(0);
			setTitle(getCurrentTitle);
		}
	}, [isExpand, content]);

	return (
		<Comp
			className={cn(
				"font-semibold text-lg rounded-md text-left uppercase text-primary w-full",
				!isExpand && "size-6 flex justify-center items-center bg-primary/20",
				className,
			)}
		>
			{title}
		</Comp>
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
						: "btn-icon btn-icon--ghost btn-icon--default size-10 [&>:not(svg)]:hidden",
					danger && "text-danger hover:bg-danger-accent",
				)}
				{...props}
			>
				{children}
			</Comp>
		</TooltipContent>
	);
}

function SidebarMenu({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("w-full my-1", className)}>{children}</div>;
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
	return <div className="h-full w-full flex flex-col">{children}</div>;
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
	SidebarHeader,
	SidebarTitle,
};
