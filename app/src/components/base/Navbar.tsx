import { useMobile } from "@/hooks/use-mobile";
import NavbarItem from "./nav/NavbarItem";
import {
	BotIcon,
	ChartNoAxesCombinedIcon,
	HomeIcon,
	LayersIcon,
	ScaleIcon,
	User2Icon,
	Users2Icon,
} from "lucide-react";
import {
	Dropdown,
	DropdownBox,
	DropdownItem,
	DropdownTrigger,
} from "../core/Dropdown";
import { Link } from "react-router-dom";

export default function Navbar() {
	const isMobile = useMobile();

	if (!isMobile) return null;

	return (
		<nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-fit border rounded-md p-1 bg-surface/80 backdrop-blur-sm shadow-md">
			<ul className="flex items-center justify-center">
				<NavbarItem icon={HomeIcon} path="/" label="trang chủ" />
				<NavbarItem icon={BotIcon} path="/chatbot" label="chatbot" />
				<li>
					<Dropdown>
						<DropdownTrigger className="btn-icon size-13 bg-primary text-primary-foreground [&>svg]:size-7 hover:bg-primary/80 transition-all duration-300">
							<LayersIcon />
						</DropdownTrigger>
						<DropdownBox>
							<DropdownItem asChild>
								<Link to={"/customer"}>
									<Users2Icon />
									<p>Khách hàng</p>
								</Link>
							</DropdownItem>
							<DropdownItem asChild>
								<Link to={"/scale"}>
									<ScaleIcon />
									<p>Cân hàng</p>
								</Link>
							</DropdownItem>
						</DropdownBox>
					</Dropdown>
				</li>
				<NavbarItem
					icon={ChartNoAxesCombinedIcon}
					path="/report"
					label="báo cáo"
				/>
				<NavbarItem icon={User2Icon} path="/me" label="tài khoản" />
			</ul>
		</nav>
	);
}
