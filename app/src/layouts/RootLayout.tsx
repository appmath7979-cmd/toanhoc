import { Outlet } from "react-router-dom";
import { Header } from "../components/base/Header";
import { Navbar } from "../components/base/Navbar";

export default function RootLayout() {
	return (
		<main>
			<Header />
			<div className="contain">
				<Outlet />
				<Navbar />
			</div>
		</main>
	);
}
