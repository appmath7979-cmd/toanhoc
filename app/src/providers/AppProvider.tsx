import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>;
}
