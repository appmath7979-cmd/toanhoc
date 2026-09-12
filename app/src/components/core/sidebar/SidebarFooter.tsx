import { ReactNode } from "react";

export function SidebarFooter({ children }: { children: ReactNode }) {
	return <div className="w-full border-t mt-auto px-1 py-1">{children}</div>;
}
