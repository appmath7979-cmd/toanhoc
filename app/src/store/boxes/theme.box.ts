import { createBox } from "@lavaz/store";

interface ThemeMode {
	isDark: boolean;
}

const initialState = {
	isDark: false,
} satisfies ThemeMode as ThemeMode;

export const themeBox = createBox(initialState, (set) => ({
	setToggleTheme: () =>
		set((prev) => {
			const root = document.documentElement;

			if (root.classList.contains("dark")) root.classList.remove("dark");
			else root.classList.add("dark");

			return { ...prev, isDark: !prev.isDark };
		}),
	setCurrentTheme: (isDark: boolean) =>
		set((prev) => {
			const root = document.documentElement;
			root.classList.remove("dark");

			if (isDark) root.classList.add("dark");

			return { ...prev, isDark };
		}),
}))
	.persist("app-theme")
	.create();
