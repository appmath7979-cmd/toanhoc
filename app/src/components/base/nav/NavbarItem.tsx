import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils/cn";
import NavItem from "@/types/nav.type";
import { Link, useLocation } from "react-router-dom";

export default function NavbarItem({ icon, label, path }: NavItem) {
	const Icon = icon;
	const pathName = useLocation().pathname;
	const breakpoint = useMobile(400);

	return (
		<li
			className={cn(
				"px-4 py-2 transition-colors duration-300 hover:text-primary",
				pathName === path && "text-primary",
			)}
		>
			<Link
				to={path}
				className={
					"flex flex-col gap-1 justify-center items-center [&_svg]:size-6"
				}
			>
				<Icon />
				{!breakpoint && (
					<p className="first-letter:uppercase text-xs whitespace-nowrap">
						{label}
					</p>
				)}
			</Link>
		</li>
	);
}
