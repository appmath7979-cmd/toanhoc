import { getCustomerSetting } from "@/apis/customer.api";
import { Button } from "@/components/ui/Button";
import Flex from "@/components/ui/layouts/Flex";
import Tooltip from "@/components/ui/Tooltip";
import { useGetCustomerSetting } from "@/hooks/query/use-customer-query";
import { CreateCustomer } from "@/schema/customer.schema";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ItemActions({ customerId }: { customerId: string }) {
	const [, { onCopy, onEdit }] = useAppStore(store.customerAction, (s) => s);
	const navigate = useNavigate();

	const handleCopy = () => {
		onCopy(customerId)
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
			<Tooltip content="Xóa">
				<Button variant="ghost" size="sm">
					<TrashIcon />
					<span>Xóa</span>
				</Button>
			</Tooltip>
		</Flex>
	);
}
