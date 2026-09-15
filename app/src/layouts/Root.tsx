import { Outlet } from "react-router-dom";
import Header from "../components/base/Header";
import SidebarProvider from "@/components/core/sidebar/SidebarProvider";
import AppSidebar from "@/components/base/system/AppSidebar";
import Navbar from "@/components/base/Navbar";

export default function Root() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className=" flex-1 h-dvh overflow-y-auto custom-scrollbar">
				<Header />
				<div className="p-4">
					<Outlet />
					<Navbar />
				</div>
			</main>
		</SidebarProvider>
	);
}
