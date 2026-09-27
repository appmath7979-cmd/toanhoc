import { cn } from "@/libs/utils/cn";
import { LoaderIcon, LucideProps } from "lucide-react";

export default function Spinner({ className, ...props }: LucideProps) {
	return (
		<LoaderIcon
			aria-label="loading-icon"
			className={cn("animate-spin", className)}
			{...props}
		/>
	);
}
