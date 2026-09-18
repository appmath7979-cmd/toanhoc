import { Button } from "@/components/core/button/Button";
import { IconButton } from "@/components/core/button/IconButton";
import {
	Dropdown,
	DropdownBox,
	DropdownItem,
	DropdownTrigger,
} from "@/components/core/Dropdown";
import { Tooltip, TooltipContent } from "@/components/core/tootltip/Tooltip";
import { useMobile } from "@/hooks/use-mobile";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import {
	CopyIcon,
	EditIcon,
	EllipsisVerticalIcon,
	TrashIcon,
} from "lucide-react";

export default function CustomerAction({ id }: { id: string }) {
	const isMobile = useMobile();
	const [, { copy }] = useAppStore(store.copyCustomer, (s) => s);

	const handleCopy = () => {};
	const handleEdit = () => {};
	const handleDelete = () => {};

	console.log(copy, id);

	if (isMobile)
		return (
			<Dropdown>
				<DropdownTrigger asChild>
					<IconButton size="sm">
						<EllipsisVerticalIcon />
					</IconButton>
				</DropdownTrigger>
				<DropdownBox>
					<DropdownItem onClick={handleCopy} asChild>
						<Button variant="ghost" className="w-full">
							<CopyIcon />
							<span>Sao chép</span>
						</Button>
					</DropdownItem>
					<DropdownItem onClick={handleEdit} asChild>
						<Button variant="ghost" className="w-full">
							<EditIcon />
							<span>Sửa thông tin</span>
						</Button>
					</DropdownItem>
					<DropdownItem onClick={handleDelete} asChild>
						<Button variant="ghost" className="w-full">
							<TrashIcon />
							<span>Xóa khách hàng</span>
						</Button>
					</DropdownItem>
				</DropdownBox>
			</Dropdown>
		);

	return (
		<div className="flex justify-end items-center gap-2">
			<Tooltip>
				<TooltipContent content="Sao chép">
					<IconButton size="sm">
						<CopyIcon />
					</IconButton>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipContent content="Sửa thông tin khách hàng">
					<IconButton size="sm">
						<EditIcon />
					</IconButton>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipContent content="Xóa khách hàng">
					<IconButton size="sm">
						<TrashIcon />
					</IconButton>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
