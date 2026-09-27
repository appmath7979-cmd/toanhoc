import { cn } from "@/libs/utils/cn";
import { ReactNode } from "react";

interface HeadingProps {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	children: ReactNode;
	className?: string;
}

export default function Heading({
	as = "h1",
	children,
	className,
}: HeadingProps) {
	const Comp = as;
	return (
		<Comp
			className={cn(
				"font-medium text-base",
				as === "h1"
					? "text-2xl lg:text-3xl font-bold"
					: as === "h2"
						? "text-xl lg:text-2xl font-semibold"
						: as === "h3"
							? "text-lg lg:text-xl font-semibold"
							: as === "h6"
								? "text-base"
								: "lg:text-lg",
				className,
			)}
		>
			{children}
		</Comp>
	);
}
