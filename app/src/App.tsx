import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./pages/Customer";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Customer />} />
			</Routes>
		</BrowserRouter>
	);
}
