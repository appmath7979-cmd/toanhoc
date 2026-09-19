import { Button } from "@/components/core/button/Button";
import {
	Dropdown,
	DropdownBox,
	DropdownItem,
	DropdownTrigger,
} from "@/components/core/Dropdown";
import { Tooltip, TooltipContent } from "@/components/core/tootltip/Tooltip";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import {
	UserRoundCheckIcon,
	UserRoundGroupIcon,
	UserRoundXIcon,
} from "lucide-react";

export default function ActiveSort({ isMobile }: { isMobile: boolean }) {
	const [active, { setActive }] = useAppStore(
		store.customerPagination,
		(s) => s.active,
	);

	return (
		<Dropdown>
			<Tooltip>
				<TooltipContent
					content={
						!active
							? "Loại tài khoản"
							: active === "true"
								? "Khách hàng hoạt động"
								: "Khách hàng ngưng hoạt động"
					}
				>
					<DropdownTrigger asChild>
						<Button variant={isMobile ? "ghost" : "outline"}>
							{!active ? (
								<UserRoundGroupIcon />
							) : active === "true" ? (
								<UserRoundCheckIcon />
							) : (
								<UserRoundXIcon />
							)}
							{!isMobile && <span>Loại tài khoản</span>}
						</Button>
					</DropdownTrigger>
				</TooltipContent>
			</Tooltip>
			<DropdownBox>
				<DropdownItem onClick={() => setActive()}>
					<UserRoundGroupIcon />
					<span>Tất cả</span>
				</DropdownItem>
				<DropdownItem onClick={() => setActive("true")}>
					<UserRoundCheckIcon />
					<span>Đang hoạt động</span>
				</DropdownItem>
				<DropdownItem onClick={() => setActive("false")}>
					<UserRoundXIcon />
					<span>Ngưng hoạt động</span>
				</DropdownItem>
			</DropdownBox>
		</Dropdown>
	);
}
