import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./style.css";
import AppProvider from "./providers/AppProvider";
import Devtool from "./Devtool";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<App />
			<Devtool />
		</AppProvider>
	</React.StrictMode>,
);
