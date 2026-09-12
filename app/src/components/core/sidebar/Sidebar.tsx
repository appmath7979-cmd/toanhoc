import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils/cn";
import { SidebarContent } from "./SidebarContent";
import {
	BotIcon,
	ChartNoAxesCombinedIcon,
	HomeIcon,
	ScaleIcon,
	SettingsIcon,
	Users2Icon,
} from "lucide-react";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuItem } from "./SidebarMenuItem";
import SidebarGroup from "./SidebarGroup";
import { Link } from "react-router-dom";
import { SidebarFooter } from "./SidebarFooter";
import { Dropdown } from "../dropdown/Dropdown";
import { DropdownTrigger } from "../dropdown/DropdownTrigger";
import { DropdownContent } from "../dropdown/DropdownContent";
import { DropdownItem } from "../dropdown/DropdownItem";

export function Sidebar() {
	const [isExpand] = useAppStore(store.sidebar, (s) => s.isExpand);
	const isMobile = useMobile();

	if (isMobile) return null;

	return (
		<aside
			className={cn(
				"border-r h-dvh shadow-md bg-surface w-10 transition-all duration-300 flex flex-col justify-between items-center",
				isExpand && "w-60",
			)}
		>
			<SidebarContent>
				<SidebarGroup title="Điều hướng">
					<SidebarMenu>
						<SidebarMenuItem setChild>
							<Link to={"/"}>
								<HomeIcon />
								<span>Trang chủ</span>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem setChild>
							<Link to={"/chatbot"}>
								<BotIcon />
								<span>Chatbot</span>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem setChild>
							<Link to={"/customer"}>
								<Users2Icon />
								<span>Khách hàng</span>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem setChild>
							<Link to={"/scale"}>
								<ScaleIcon />
								<span>Cân hàng</span>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem setChild>
							<Link to={"/report"}>
								<ChartNoAxesCombinedIcon />
								<span>Báo cáo</span>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<Dropdown>
						<DropdownTrigger>
							<SidebarMenuItem>
								<SettingsIcon />
								<span>Cài đặt</span>
							</SidebarMenuItem>
						</DropdownTrigger>
						<DropdownContent>
							<DropdownItem>heoo</DropdownItem>
						</DropdownContent>
					</Dropdown>
					<SidebarMenuItem>
						<SettingsIcon />
						<span>Cài đặt</span>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</aside>
	);
}
