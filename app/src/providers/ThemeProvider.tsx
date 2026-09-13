import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [, { setCurrentTheme }] = useAppStore(
		store.toggleTheme,
		(s) => s.isDark,
	);

	useEffect(() => {
		if (typeof window === "undefined") setCurrentTheme(false);
		else {
			const isCurrentDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			setCurrentTheme(isCurrentDark);
		}
	}, []);

	return <>{children}</>;
}
