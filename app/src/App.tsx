import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Root } from "./layouts/Root";
import AppProvider from "./providers/AppProvider";

export function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Root />}>
						<Route path="/" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}
