import { useMobile } from "@/hooks/use-mobile";
import SelectAll from "./actions/SelectAll";
import { memo } from "react";
import Delete from "./actions/Delete";
import Sort from "./actions/Sort";
import ActiveSort from "./actions/ActiveSort";

const CustomerTableActions = memo(({ ids }: { ids: string[] }) => {
	const isMobile = useMobile(1028);

	return (
		<div className="pb-4 flex justify-between items-center">
			<SelectAll isMobile={isMobile} ids={ids} />
			<div className="flex items-center gap-1">
				<ActiveSort isMobile={isMobile} />
				<Sort isMobile={isMobile} />
				<Delete isMobile={isMobile} />
			</div>
		</div>
	);
});

export default CustomerTableActions;
