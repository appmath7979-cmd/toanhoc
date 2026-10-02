import { Button } from "@/components/ui/Button";
import Flex from "@/components/ui/layouts/Flex";
import Tooltip from "@/components/ui/Tooltip";
import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";

export default function ItemActions({ customerId }: { customerId: string }) {
	return (
		<Flex className="gap-1">
			<Tooltip content="Sao chép">
				<Button variant="ghost" size="sm">
					<CopyIcon />
					<span>Sao chép</span>
				</Button>
			</Tooltip>
			<Tooltip content="Chỉnh sửa">
				<Button variant="ghost" size="sm">
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
