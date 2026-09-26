import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function ButtonGroup({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("", className)}>{children}</div>;
}
