import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./pages/customer/Customer";
import AddCustomer from "./pages/customer/AddCustomer";
import EditCustomer from "./pages/customer/EditCustomer";
import CustomerDetail from "./pages/customer/CustomerDetail";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Customer />} />
				<Route path="/customers/add" element={<AddCustomer />} />
				<Route path="/customers/edit" element={<EditCustomer />} />
				<Route path={`/customers/:id`} element={<CustomerDetail />} />
			</Routes>
		</BrowserRouter>
	);
}
