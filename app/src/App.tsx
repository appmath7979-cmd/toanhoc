import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Root } from "./layouts/Root";

export function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Root />}>
						<Route path="/" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
