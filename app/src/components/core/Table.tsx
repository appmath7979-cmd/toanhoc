import { cn } from "@/libs/utils/cn";
import { ComponentProps } from "react";

function Table({ className, ...props }: ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="w-full border rounded-md overflow-x-hidden"
		>
			<table
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ ...props }: ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className="bg-surface [&_tr]:border-b rounded-t-md"
			{...props}
		/>
	);
}

function TableRow({
	isHeader = false,
	className,
	...props
}: { isHeader?: boolean } & ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				!isHeader &&
					"border-b transition-colors hover:bg-muted/10 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
	return (
		<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
	);
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
	return (
		<td
			data-slot="table-head"
			className={cn(
				"h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

export { Table, TableHeader, TableHead, TableRow, TableBody, TableCell };
