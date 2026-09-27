import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

const spanMap = {
	1: "grid-cols-1",
	2: "grid-cols-1 md:grid-cols-2",
	3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
	4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
	12: "grid-cols-1 md:grid-cols-6 lg:grid-cols-12",
};

interface GridProps {
	children: ReactNode;
	span?: keyof typeof spanMap;
	className?: string;
}

export default function Grid({ children, span = 1, className }: GridProps) {
	return (
		<div className={cn("grid gap-4", spanMap[span], className)}>{children}</div>
	);
}
