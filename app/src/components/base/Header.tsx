import { IconButton } from "../core/IconButton";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { useLocation } from "react-router-dom";

export function Header() {
	const location = useLocation();

	return (
		<header className="w-full contain py-2 shadow-md flex items-center justify-between sticky top-0 left-0">
			{location.pathname === "/" ? (
				<IconButton>
					<MenuIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => window.history.back()}>
					<ChevronLeftIcon />
				</IconButton>
			)}
			<h1 className="uppercase font-semibold md:text-lg text-primary absolute top-1/2 left-1/2 -translate-1/2">
				Toán học
			</h1>
			<DatePicker />
		</header>
	);
}
