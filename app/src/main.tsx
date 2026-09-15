import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./style.css";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import AppProvider from "./providers/AppProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<App />
			<TanStackDevtools
				plugins={[
					{ name: "Tanstack Query", render: <ReactQueryDevtools /> },
					{ name: "Tanstack Form", render: <FormDevtoolsPanel /> },
				]}
			/>
		</AppProvider>
	</React.StrictMode>,
);
