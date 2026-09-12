import { ReactNode } from "react";

export function SidebarMenu({ children }: { children: ReactNode }) {
	return <ul className="w-full">{children}</ul>;
}
