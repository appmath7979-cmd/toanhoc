import { useEffect, useState } from "react";

export function useMobile(threadhold?: number): boolean {
	const [currentWidth, setCurrentWidth] = useState<number | undefined>(() =>
		typeof window != "undefined" ? window.innerWidth : undefined,
	);

	useEffect(() => {
		const handleResize = () => {
			setCurrentWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (typeof window == "undefined" || currentWidth === undefined) return false;
	return currentWidth < (threadhold ?? 768);
}
