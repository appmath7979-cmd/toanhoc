import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
	return (
		<div className="border rounded-md bg-surface shadow-md space-y-6 p-6">
			{children}
		</div>
	);
}

function CardTitle({
	title,
	className,
}: {
	title: string;
	className?: string;
}) {
	return <h2 className={cn("md:text-lg font-semibold", className)}>{title}</h2>;
}

function CardDescription({ children }: { children: ReactNode }) {
	const Comp = typeof children === "string" ? "p" : "div";
	return <Comp className="text-sm text-muted-foreground">{children}</Comp>;
}

function CardHeader({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col gap-0.5", className)}>{children}</div>
	);
}

function CardBody({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <div className={cn("space-y-4", className)}>{children}</div>;
}

export { Card, CardTitle, CardDescription, CardHeader, CardBody };
