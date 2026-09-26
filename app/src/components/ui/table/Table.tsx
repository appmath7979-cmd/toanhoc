import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

function Table({ children, ...props }: ComponentProps<"table">) {
	return (
		<div aria-data="table-container">
			<table {...props}>{children}</table>
		</div>
	);
}

function TableHeader({
	children,
	className,
	...props
}: ComponentProps<"thead">) {
	return (
		<thead aria-data="table-header" className={cn("", className)} {...props}>
			{children}
		</thead>
	);
}

function TableRow({ className, children, ...props }: ComponentProps<"tr">) {
	return (
		<tr className={cn("", className)} {...props}>
			{children}
		</tr>
	);
}

function TableBody({ children, ...props }: ComponentProps<"tbody">) {
	return <tbody {...props}>{children}</tbody>;
}

function TableCell({ className, children, ...props }: ComponentProps<"td">) {
	return (
		<td className={cn("", className)} {...props}>
			{children}
		</td>
	);
}

function TableHead({ className, children, ...props }: ComponentProps<"th">) {
	return (
		<th className={cn("", className)} {...props}>
			{children}
		</th>
	);
}

export { Table, TableHeader, TableRow, TableBody, TableCell, TableHead };
