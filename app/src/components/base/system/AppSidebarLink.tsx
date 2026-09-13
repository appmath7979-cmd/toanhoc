import NavItem from "@/types/nav.type";
import { Link } from "react-router-dom";

export default function AppSidebarLink({ icon, label, path }: NavItem) {
	const Icon = icon;
	return (
		<Link to={path}>
			<Icon />
			<span className="first-letter:uppercase">{label}</span>
		</Link>
	);
}
