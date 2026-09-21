import {
	Alert,
	AlertAction,
	AlertCancel,
	AlertContent,
	AlertTrigger,
} from "@/components/core/Alert";
import { Button } from "@/components/core/button/Button";
import { IconButton } from "@/components/core/button/IconButton";
import {
	Dropdown,
	DropdownBox,
	DropdownItem,
	DropdownTrigger,
} from "@/components/core/Dropdown";
import { Tooltip, TooltipContent } from "@/components/core/tootltip/Tooltip";
import { useDeleteCustomerById } from "@/hooks/query/useCustomerQuery";
import { useGetSettingById } from "@/hooks/query/useSettingQuery";
import { useMobile } from "@/hooks/use-mobile";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import {
	CopyIcon,
	EditIcon,
	EllipsisVerticalIcon,
	TrashIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerAction({
	id,
	full_name,
	guest,
	phone_number,
	onSelected,
}: {
	id: string;
	full_name: string;
	phone_number: string;
	guest: boolean;
	onSelected: (value: string) => void;
}) {
	const isMobile = useMobile();
	const [customer, { copy, setIsCopy, setIsEdit }] = useAppStore(
		store.copyCustomer,
		(s) => s,
	);
	const { data } = useGetSettingById(id);
	const { mutate } = useDeleteCustomerById();

	const navigate = useNavigate();

	const handleCopy = () => {
		if (!data) return;
		copy({ ...customer.data, setting: data.data });
		setIsCopy();
		navigate("/customer/add");
	};

	const handleEdit = () => {
		if (!data) return;
		copy({ full_name, guest, phone_number, setting: data.data }, id);
		setIsEdit();
		navigate("/customer/edit");
	};

	const handleDelete = () => {
		mutate(id);
		onSelected(id);
	};

	console.log(copy, id);

	if (isMobile)
		return (
			<Alert>
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
							<AlertTrigger setChild>
								<Button variant="ghost" className="w-full">
									<TrashIcon />
									<span>Xóa khách hàng</span>
								</Button>
							</AlertTrigger>
						</DropdownItem>
					</DropdownBox>
				</Dropdown>
				<AlertContent
					title="Bạn có chắc muốn xóa những khách hàng này?"
					description="Điều này sẽ xóa vĩnh viễn khách hàng bạn đã chọn"
				>
					<AlertCancel>Hủy bỏ</AlertCancel>
					<AlertAction setChild>
						<Button onClick={handleDelete}>Xác nhận xóa</Button>
					</AlertAction>
				</AlertContent>
			</Alert>
		);

	return (
		<div className="flex justify-end items-center gap-2">
			<Tooltip>
				<TooltipContent content="Sao chép">
					<IconButton variant="ghost" size="sm" onClick={handleCopy}>
						<CopyIcon />
					</IconButton>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipContent content="Sửa thông tin khách hàng">
					<IconButton variant="ghost" size="sm" onClick={handleEdit}>
						<EditIcon />
					</IconButton>
				</TooltipContent>
			</Tooltip>
			<Alert>
				<Tooltip>
					<TooltipContent content="Xóa khách hàng">
						<AlertTrigger setChild>
							<IconButton variant="ghost" size="sm">
								<TrashIcon />
							</IconButton>
						</AlertTrigger>
					</TooltipContent>
				</Tooltip>
				<AlertContent
					title="Bạn có chắc muốn xóa những khách hàng này?"
					description="Điều này sẽ xóa vĩnh viễn khách hàng bạn đã chọn"
				>
					<AlertCancel>Hủy bỏ</AlertCancel>
					<AlertAction setChild>
						<Button onClick={handleDelete}>Xác nhận xóa</Button>
					</AlertAction>
				</AlertContent>
			</Alert>
		</div>
	);
}
