import {
	BotIcon,
	ChartNoAxesCombinedIcon,
	HomeIcon,
	LayersIcon,
	ScaleIcon,
	UserRoundIcon,
	Users2Icon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMobile } from "../../hooks/useMobile";
import { IconButton } from "../core/IconButton";
import { Tooltip } from "../core/Tooltip";
import { cn } from "../../utils/cn";
import { Dropdown } from "../core/dropdown/Dropdown";
import { DropdownTrigger } from "../core/dropdown/DropdownTrigger";
import { DropdownContent } from "../core/dropdown/DropdownContent";
import { DropdownItem } from "../core/dropdown/DropdownItem";
import { Button } from "../core/Button";

export function Navbar() {
	const location = useLocation();
	const currentPath = location.pathname;
	const isMobile = useMobile();

	return (
		<nav className="nav">
			<Link
				className={cn("nav-item", currentPath === "/" && "text-primary")}
				to={"/"}
			>
				<HomeIcon size={isMobile ? 20 : 18} />
				<span className="text-xs font-semibold max-lg:hidden">Trang chủ</span>
			</Link>
			<Link
				className={cn(
					"nav-item",
					currentPath === "/chatbot" && "text-primary",
				)}
				to={"/chatbot"}
			>
				<BotIcon size={isMobile ? 20 : 18} />
				<span className="text-xs font-semibold max-lg:hidden">Chatbot</span>
			</Link>
			<Dropdown>
				<Tooltip content="Xử lý">
					<DropdownTrigger>
						<IconButton className="size-14 btn-primary rounded-full shadow-md [&_svg]:size-6">
							<LayersIcon />
						</IconButton>
					</DropdownTrigger>
				</Tooltip>
				<DropdownContent>
					<DropdownItem>
						<Button
							variant="outline"
							setChild
							className={cn(currentPath === "/customer" && "text-primary")}
						>
							<Link to={"/customer"}>
								<Users2Icon />
								<span>Khách hàng</span>
							</Link>
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							variant="outline"
							setChild
							className={cn(currentPath === "/scale" && "text-primary")}
						>
							<Link to={"/scale"}>
								<ScaleIcon />
								<span>Cân hàng</span>
							</Link>
						</Button>
					</DropdownItem>
				</DropdownContent>
			</Dropdown>
			<Link
				className={cn("nav-item", currentPath === "/report" && "text-primary")}
				to={"/report"}
			>
				<ChartNoAxesCombinedIcon size={isMobile ? 20 : 18} />
				<span className="text-xs font-semibold max-lg:hidden">Báo cáo</span>
			</Link>
			<Link
				className={cn("nav-item", currentPath === "/user" && "text-primary")}
				to={"/user"}
			>
				<UserRoundIcon size={isMobile ? 20 : 18} />
				<span className="text-xs font-semibold max-lg:hidden">Tài khoản</span>
			</Link>
		</nav>
	);
}
