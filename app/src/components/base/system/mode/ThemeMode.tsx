import { Button } from "@/components/core/button/Button";
import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeMode() {
	const [isDark, { toggleTheme }] = useAppStore(
		store.toggleTheme,
		(s) => s.isDark,
	);

	return (
		<Button
			onClick={toggleTheme}
			className={cn(
				"font-semibold flex items-center gap-1.5 px-4 py-1 w-full",
				isDark
					? "text-blue-600 bg-blue-600/10"
					: "text-amber-600 bg-amber-600/10",
			)}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
			<span>Chế độ {isDark ? "sáng" : "tối"}</span>
		</Button>
	);
}
