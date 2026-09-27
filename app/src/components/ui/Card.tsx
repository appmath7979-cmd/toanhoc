import { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col gap-3 border border-border rounded-md shadow-md p-4 surface-0">
			{children}
		</div>
	);
}

export { Card };
