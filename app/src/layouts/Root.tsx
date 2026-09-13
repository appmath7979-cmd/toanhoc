import { Outlet } from "react-router-dom";
import Header from "../components/base/Header";
import SidebarProvider from "@/components/core/sidebar/SidebarProvider";
import AppSidebar from "@/components/base/system/AppSidebar";

export function Root() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<Header />
				<div className="px-4">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
