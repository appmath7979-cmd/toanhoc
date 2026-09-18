import { cn } from "@/libs/utils/cn";
import { Loader2Icon, LucideProps } from "lucide-react";

export default function Spinner({ className, ...props }: LucideProps) {
	return (
		<Loader2Icon
			aria-label="loading-icon"
			className={cn("animate-spin", className)}
			{...props}
		/>
	);
}
