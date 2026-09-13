import TooltipProvider from "@/components/core/tootltip/TooltipProvider";
import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
		</ThemeProvider>
	);
}
