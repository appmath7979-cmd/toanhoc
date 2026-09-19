import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function ButtonGroup({
	children,
	direction = "horizontal",
}: {
	children: ReactNode;
	direction?: "vertical" | "horizontal";
}) {
	return (
		<div
			className={cn(
				"inline-flex items-center border rounded-md",
				direction === "vertical" && "flex-col",
			)}
		>
			{children}
		</div>
	);
}
