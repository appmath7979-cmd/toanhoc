import { Button } from "@/components/core/button/Button";
import { Tooltip, TooltipContent } from "@/components/core/tootltip/Tooltip";
import { useDelteCustomer } from "@/hooks/query/useCustomerQuery";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { TrashIcon } from "lucide-react";

export default function Delete({ isMobile }: { isMobile: boolean }) {
	const [selected, { setIsSelectAll, setSelectAll }] = useAppStore(
		store.customer,
		(s) => s.selected,
	);
	const { mutate } = useDelteCustomer();

	const handleDelete = () => {
		mutate({ ids: selected });
		setIsSelectAll(false);
		setSelectAll([]);
	};

	return (
		<Tooltip>
			<TooltipContent content="Xóa">
				<Button
					variant={isMobile ? "ghost" : "danger"}
					disabled={selected.length === 0}
					onClick={handleDelete}
				>
					<TrashIcon />
					{!isMobile && <span>Xóa</span>}
				</Button>
			</TooltipContent>
		</Tooltip>
	);
}
