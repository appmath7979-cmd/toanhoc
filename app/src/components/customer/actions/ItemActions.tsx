import DeleteAlert from "@/components/system/dialog/DeleteAlert";
import { Button } from "@/components/ui/Button";
import Flex from "@/components/ui/layouts/Flex";
import Tooltip from "@/components/ui/Tooltip";
import { useDeleteCustomer } from "@/hooks/query/use-customer-query";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ItemActions({ customerId }: { customerId: string }) {
	const [, { onCopy, onEdit }] = useAppStore(store.customerAction, (s) => s);
	const navigate = useNavigate();

	const { mutate } = useDeleteCustomer();

	const handleCopy = () => {
		onCopy(customerId);
		navigate("/customers/add");
	};

	const handleEdit = () => {
		onEdit(customerId);
		navigate("/customers/edit");
	};

	return (
		<Flex className="gap-1">
			<Tooltip content="Sao chép">
				<Button variant="ghost" size="sm" onClick={handleCopy}>
					<CopyIcon />
					<span>Sao chép</span>
				</Button>
			</Tooltip>
			<Tooltip content="Chỉnh sửa">
				<Button variant="ghost" size="sm" onClick={handleEdit}>
					<EditIcon />
					<span>Chỉnh sửa</span>
				</Button>
			</Tooltip>
			<DeleteAlert
				title="Xóa khách hàng"
				description="Bạn có chắc xóa khách hàng này? Điều này sẽ xóa vĩnh viễn khách hàng bạn đang xóa."
				onClick={() => mutate(customerId)}
			/>
		</Flex>
	);
}
