import { useEffect, useState } from "react";

export function useDebounce({
	value,
	delay = 300,
}: {
	value: string;
	delay?: number;
}) {
	const [debounced, setDebounced] = useState<string>("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
}
