import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./style.css";
import AppProvider from "./providers/AppProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster expand richColors />
		</AppProvider>
	</React.StrictMode>,
);
