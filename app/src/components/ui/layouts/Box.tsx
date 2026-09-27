import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

interface BoxProps {
	children: ReactNode;
	className?: string;
	mode?: "layout" | "container";
}

export default function Box({
	children,
	className,
	mode = "layout",
}: BoxProps) {
	return (
		<div
			className={cn(
				"w-full h-dvh overflow-y-auto custom-scrollbar",
				mode === "container" && "h-auto",
				mode === "layout" && "cotain",
				className,
			)}
		>
			{children}
		</div>
	);
}
