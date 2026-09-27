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
		<div
			className={cn(
				"flex flex-col gap-1",
				direction === "horizontal" && "flex-row items-center",
				className,
			)}
		>
			{children}
		</div>
	);
}
