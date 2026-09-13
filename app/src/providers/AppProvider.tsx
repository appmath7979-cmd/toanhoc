import TooltipProvider from "@/components/core/tootltip/TooltipProvider";
import { ReactNode } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
	return <TooltipProvider delayDuration={100}>{children}</TooltipProvider>;
}
