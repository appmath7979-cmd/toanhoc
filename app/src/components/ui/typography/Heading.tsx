import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

interface HeadingProps {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	children: ReactNode;
	className?: string;
}

export default function Heading({
	as = "h1",
	children,
	className,
}: HeadingProps) {
	const Comp = as;
	return <Comp className={cn("", className)}>{children}</Comp>;
}
