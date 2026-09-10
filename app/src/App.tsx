import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Customer } from "./pages/Customer";
import RootLayout from "./layouts/RootLayout";
import { Home } from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/customers" element={<Customer />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
