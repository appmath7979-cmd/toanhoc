import { ComponentProps, ReactNode } from "react";

function Pagination({ children }: { children: ReactNode }) {
	return (
		<div className="flex justify-center items-center gap-1">{children}</div>
	);
}

function PaginationItem({
	children,
	...props
}: { children: ReactNode } & ComponentProps<"button">) {
	return <button {...props}>{children}</button>;
}

export { Pagination, PaginationItem };
