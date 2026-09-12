import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { ReactNode } from "react";

interface SidebarGroupProps {
	title: string;
	children: ReactNode;
}

export default function SidebarGroup({ title, children }: SidebarGroupProps) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	return (
		<div className={cn("flex flex-col w-full", isExpand && "[&_li]:border-l")}>
			{isExpand ? (
				<p className="text-xs font-medium truncate uppercase py-1">{title}</p>
			) : (
				<span className="w-full h-px bg-secondary-accent " />
			)}
			<div className={cn("px-1", !isExpand && "p-0")}>{children}</div>
		</div>
	);
}
