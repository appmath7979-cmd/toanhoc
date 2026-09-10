import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/base/Header";

export default function RootLayout() {
	return (
		<main className="contain">
			<Header />
			<Outlet />
			<nav>
				<Link to={"/customers"}>Customers</Link>
			</nav>
		</main>
	);
}
