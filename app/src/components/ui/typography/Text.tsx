import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

interface TextProps {
	as?: "p" | "span" | "em";
	className?: string;
	children: ReactNode;
}

export default function Text({ as = "p", className, children }: TextProps) {
	const Comp = as;

	return <Comp className={cn("", className)}>{children}</Comp>;
}
