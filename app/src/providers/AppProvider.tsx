import TooltipProvider from "@/components/core/tootltip/TooltipProvider";
import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<QueryProvider>
			<ThemeProvider>
				<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
			</ThemeProvider>
		</QueryProvider>
	);
}
