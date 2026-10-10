import { ReactNode } from "react";

interface ContainerProps {
	as?: "div" | "main";
	children: ReactNode;
}
export default function Container({ as = "main", children }: ContainerProps) {
	const Comp = as;
	return (
		<Comp className="w-full overflow-y-auto h-dvh custom-scrollbar">
			{children}
		</Comp>
	);
}
