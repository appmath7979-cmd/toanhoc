import { ComponentProps } from "react";

function Table({ className, children, ...props }: ComponentProps<"table">) {
	return (
		<div>
			<table {...props}>{children}</table>
		</div>
	);
}

function TableRow({ className, children, ...props }: ComponentProps<"tr">) {
	return <tr {...props}>{children}</tr>;
}

function TableCell({ className, children, ...props }: ComponentProps<"td">) {
	return <td {...props}>{children}</td>;
}

function TableHeader({
	className,
	children,
	...props
}: ComponentProps<"thead">) {
	return <thead {...props}>{children}</thead>;
}

function TableBody({ className, children, ...props }: ComponentProps<"tbody">) {
	return <tbody {...props}>{children}</tbody>;
}

function TableHead({ className, children, ...props }: ComponentProps<"th">) {
	return <th {...props}>{children}</th>;
}

function TableFooter({
	className,
	children,
	...props
}: ComponentProps<"tfoot">) {
	return <tfoot {...props}>{children}</tfoot>;
}

function TableCaption({
	className,
	children,
	...props
}: ComponentProps<"caption">) {
	return <caption {...props}>{children}</caption>;
}

export {
	Table,
	TableRow,
	TableCell,
	TableHeader,
	TableBody,
	TableHead,
	TableFooter,
	TableCaption,
};
