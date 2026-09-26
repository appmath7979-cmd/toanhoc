import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function Field({
	children,
	direction = "vertical",
	className,
}: {
	children: ReactNode;
	direction?: "vertical" | "horizontal";
	className?: string;
}) {
	return (
		<div className={cn("space-y-2", direction && "flex gap-2", className)}>
			{children}
		</div>
	);
}
