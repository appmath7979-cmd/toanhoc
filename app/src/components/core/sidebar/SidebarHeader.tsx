import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function SidebarHeader({
	children,
	isExpand = true,
}: {
	children: ReactNode;
	isExpand?: boolean;
}) {
	return <div className={cn("font-semibold", isExpand)}>{children}</div>;
}
