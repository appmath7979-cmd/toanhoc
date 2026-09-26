import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export default function Devtool() {
	return (
		<TanStackDevtools
			plugins={[
				{
					name: "Tanstack Query",
					render: <ReactQueryDevtoolsPanel />,
				},
			]}
		/>
	);
}
