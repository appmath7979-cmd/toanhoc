import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/core/sidebar/Sidebar";
import { store } from "@/store/store";
import NavItem from "@/types/nav.type";
import { useAppStore } from "@lavaz/store";
import {
	BotIcon,
	ChartNoAxesCombinedIcon,
	HomeIcon,
	LockIcon,
	MoonIcon,
	ScaleIcon,
	SettingsIcon,
	SunDimIcon,
	User2Icon,
	Users2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarNav: NavItem[] = [
	{
		path: "/",
		icon: HomeIcon,
		label: "Trang chủ",
	},
	{
		path: "/chatbot",
		icon: BotIcon,
		label: "Chatbot",
	},
	{
		path: "/customer",
		icon: Users2Icon,
		label: "Khách hàng",
	},
	{
		path: "/scale",
		icon: ScaleIcon,
		label: "Cân hàng",
	},
	{
		path: "/report",
		icon: ChartNoAxesCombinedIcon,
		label: "Báo cáo",
	},
];

export default function AppSidebar() {
	const [isDark, { setToggleTheme }] = useAppStore(
		store.toggleTheme,
		(s) => s.isDark,
	);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup title="trang">
					<SidebarMenu>
						{sidebarNav.map((nav) => {
							const key = `nav-${nav.label.toLowerCase().replace(" ", "-")}`;
							const Icon = nav.icon;
							return (
								<SidebarMenuItem key={key} tooltip={nav.label} setChild>
									<Link to={nav.path}>
										<Icon />
										<span className="first-letter:uppercase">{nav.label}</span>
									</Link>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarMenu className="mt-auto">
					<SidebarMenuItem
						tooltip={`Chế độ ${isDark ? "sáng" : "tối"}`}
						onClick={setToggleTheme}
					>
						{isDark ? (
							<SunDimIcon className="text-orange-400" />
						) : (
							<MoonIcon className="text-blue-700" />
						)}
						<span className={isDark ? "text-orange-400" : "text-blue-700"}>
							Chế độ {isDark ? "sáng" : "tối"}
						</span>
					</SidebarMenuItem>
					<SidebarMenuItem tooltip="Khóa ứng dụng">
						<LockIcon />
						<span>Khóa ứng dụng</span>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem tooltip="Thiết lập tài khoản" setChild>
						<Link to={"/me"}>
							<User2Icon />
							<span>Thiết lập tài khoản</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem tooltip="Thiết lập hệ thống" setChild>
						<Link to={"/setting"}>
							<SettingsIcon />
							<span>Thiết lập hệ thống</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
