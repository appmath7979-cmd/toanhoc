import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./pages/customer/Customer";
import AddCustomer from "./pages/customer/AddCustomer";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Customer />} />
				<Route path="/customers/add" element={<AddCustomer />} />
			</Routes>
		</BrowserRouter>
	);
}
