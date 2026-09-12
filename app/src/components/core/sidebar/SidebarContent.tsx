import { ReactNode } from "react";

export function SidebarContent({ children }: { children: ReactNode }) {
	return (
		<div className="px-1 flex flex-col gap-4 items-center w-full">
			{children}
		</div>
	);
}
