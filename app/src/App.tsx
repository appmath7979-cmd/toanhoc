import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Root } from "./layouts/Root";
import AppProvider from "./providers/AppProvider";
import Customer from "./pages/Customer";

export function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Root />}>
						<Route path="/" element={<Home />} />
						<Route path="/customer" element={<Customer />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}
