import { useMobile } from "@/hooks/use-mobile";
import SelectAll from "./actions/SelectAll";
import { memo } from "react";
import Delete from "./actions/Delete";
import Sort from "./actions/Sort";

const CustomerTableActions = memo(() => {
	const isMobile = useMobile(1028);
	console.log("re-render");
	return (
		<div className="pb-4 flex justify-between items-center">
			<SelectAll isMobile={isMobile} />
			<div className="flex items-center gap-1">
				<Sort isMobile={isMobile} />
				<Delete isMobile={isMobile} />
			</div>
		</div>
	);
});

export default CustomerTableActions;
