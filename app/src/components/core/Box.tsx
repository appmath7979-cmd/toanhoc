import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

export default function Box({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) {
	const isMobile = useMobile(1028);
	return (
		<div className={cn("space-y-4", isMobile && "pb-20", className)}>
			{children}
		</div>
	);
}
