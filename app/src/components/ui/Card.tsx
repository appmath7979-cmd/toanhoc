import { ReactNode } from "react";
import { cn } from "@/libs/utils/cn";

interface CardTitleProps {
	as?: "h2" | "h3" | "h4" | "h5" | "h6";
	children: ReactNode;
	className?: string;
}

function Card({ children }: { children: ReactNode }) {
	return <div className="">{children}</div>;
}

function CardHeader({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("", className)}>{children}</div>;
}

function CardTitle({ children, className, as = "h2" }: CardTitleProps) {
	const Comp = as;
	return <Comp className={cn("", className)}>{children}</Comp>;
}

function CardBody({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("", className)}>{children}</div>;
}

export { Card, CardBody, CardHeader, CardTitle };
