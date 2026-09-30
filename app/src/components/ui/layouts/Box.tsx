import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

const spacingY = {
	0: "space-y-0",
	0.5: "space-y-0.5",
	1: "space-y-1",
	2: "space-y-2",
	3: "space-y-3",
};

interface BoxProps {
	children?: ReactNode;
	className?: string;
	spaceY?: keyof typeof spacingY;
}

export default function Box({ children, className, spaceY = 1 }: BoxProps) {
	return <div className={cn("", spacingY[spaceY], className)}>{children}</div>;
}
