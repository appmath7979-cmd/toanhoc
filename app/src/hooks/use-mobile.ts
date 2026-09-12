import { useEffect, useState } from "react";

export function useMobile(threshold: number = 786): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(
		() => typeof window !== "undefined" && window.innerWidth < threshold,
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handler = () => {
			setIsMobile(window.innerWidth < threshold);
		};

		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, [threshold]);

	return isMobile;
}
