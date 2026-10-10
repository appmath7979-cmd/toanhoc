import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

const directions = {
	horizontal: "",
	"horizontal-reverse": "",
	vertical: "flex-col",
	"vertical-reverse": "",
};

interface FlexProps {
	direction?: keyof typeof directions;
	className?: string;
	children: ReactNode;
	display?: "none" | "inline-flex" | "flex";
	justify?: "start" | "center" | "end" | "between";
}

export default function Flex({
	direction = "horizontal",
	className,
	display = "flex",
	justify,
	children,
}: FlexProps) {
	return (
		<div
			className={cn(
				"items-center",
				display,
				justify,
				directions[direction],
				className,
			)}
		>
			{children}
		</div>
	);
}
