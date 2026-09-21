import {
	Alert,
	AlertAction,
	AlertCancel,
	AlertContent,
	AlertTrigger,
} from "@/components/core/Alert";
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
		<Alert>
			<Tooltip>
				<TooltipContent content="Xóa">
					<AlertTrigger setChild>
						<Button
							variant={isMobile ? "ghost" : "danger"}
							disabled={selected.length === 0}
						>
							<TrashIcon />
							{!isMobile && <span>Xóa</span>}
						</Button>
					</AlertTrigger>
				</TooltipContent>
			</Tooltip>
			<AlertContent
				title="Bạn có chắc muốn xóa những khách hàng này?"
				description="Điều này sẽ xóa vĩnh viễn những khách hàng bạn đã chọn"
			>
				<AlertCancel>Hủy bỏ</AlertCancel>
				<AlertAction setChild>
					<Button onClick={handleDelete}>Xác nhận xóa</Button>
				</AlertAction>
			</AlertContent>
		</Alert>
	);
}
