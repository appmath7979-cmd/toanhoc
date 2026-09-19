import { useEffect, useState } from "react";
import { DatePicker } from "../core/DatePicker";
import { SidebarTrigger } from "../core/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { staticDataDefault } from "@/libs/helper/static-data";

export default function Header() {
	const [staticData, setStaticData] = useState<string>("Toán học")
	const location = useLocation()

	useEffect(() => {
		const currentPath = location.pathname

		const data = staticDataDefault[currentPath as keyof typeof staticDataDefault]
		setStaticData(data)
	}, [location])

	return (
		<header className="bg-surface sticky top-0 left-0 w-full border-b px-4 py-1.5 flex justify-between items-center z-9999">
			<SidebarTrigger />
			<h1 className="font-bold uppercase text-primary absolute top-1/2 left-1/2 -translate-1/2 lg:text-lg">
				{staticData ?? "Toán học"}
			</h1>
			<DatePicker />
		</header>
	);
}
