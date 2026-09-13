import { DatePicker } from "../core/DatePicker";
import { SidebarTrigger } from "../core/sidebar/Sidebar";

export default function Header() {
	return (
		<header className="bg-surface sticky top-0 left-0 w-full border-b px-4 py-1.5 flex justify-between items-center">
			<SidebarTrigger />
			<h1 className="font-bold uppercase text-primary absolute top-1/2 left-1/2 -translate-1/2 lg:text-lg">
				Toán học
			</h1>
			<DatePicker />
		</header>
	);
}
