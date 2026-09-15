import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function Field({
	children,
	direction = "vertical",
	className,
}: {
	direction?: "vertical" | "horizontal";
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex gap-2",
				direction === "vertical" ? "flex-col" : "max-md:flex-col",
				className,
			)}
		>
			{children}
		</div>
	);
}
