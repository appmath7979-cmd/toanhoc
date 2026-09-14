import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Root } from "./layouts/Root";
import AppProvider from "./providers/AppProvider";
import Customer from "./pages/customer/Customer";
import AddCustomer from "./pages/customer/AddCustomer";

export function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Root />}>
						<Route path="/" element={<Home />} />
						<Route path="/customer">
							<Route index element={<Customer />} />
							<Route path="add" element={<AddCustomer />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}
