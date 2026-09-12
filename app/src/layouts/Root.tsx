import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/core/sidebar/Sidebar";
import { Header } from "../components/base/Header";

export function Root() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="w-full">
				<Header />
				<Outlet />
			</div>
		</div>
	);
}
