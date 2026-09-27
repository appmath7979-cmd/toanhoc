import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

interface TextProps {
	as?: "p" | "span";
	children: ReactNode;
	className?: string;
}

export default function Text({ as = "p", children, className }: TextProps) {
	const Comp = as;

	return <Comp className={cn("", className)}>{children}</Comp>;
}
