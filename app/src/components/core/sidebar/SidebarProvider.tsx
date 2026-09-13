import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { ReactNode } from "react";

interface SidebarProviderProps {
	children: ReactNode;
	expand?: boolean;
}

export default function SidebarProvider({
	children,
	expand = true,
}: SidebarProviderProps) {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);

	return (
		<div
			className={cn(
				"flex [&_aside]:transition-all [&_aside]:duration-300",
				expand && !isExpand && "[&_aside]:w-10",
				!expand || (isExpand && "[&_aside]:w-60"),
			)}
		>
			{children}
		</div>
	);
}
