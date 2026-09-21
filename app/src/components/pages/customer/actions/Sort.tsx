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
	ArrowDownAZIcon,
	ArrowDownUpIcon,
	ArrowDownWideNarrowIcon,
	ArrowUpAZIcon,
	ArrowUpNarrowWideIcon,
} from "lucide-react";
import { ElementType } from "react";

export default function Sort({ isMobile }: { isMobile: boolean }) {
	const [sort, { setSort }] = useAppStore(
		store.customerPagination,
		(s) => s.sort,
	);

	const sortTitle = (): { name: string; icon: ElementType } => {
		let sortNamed: string;
		let icon: ElementType;

		switch (sort) {
			case "latest":
				sortNamed = "Mới nhất";
				icon = ArrowDownWideNarrowIcon;
				break;
			case "oldest":
				sortNamed = "Cũ nhất";
				icon = ArrowUpNarrowWideIcon;
				break;
			case "name_ASC":
				sortNamed = "Sắp xếp theo tên A-Z";
				icon = ArrowDownAZIcon;
				break;
			case "name_DESC":
				sortNamed = "Sắp xếp theo tên Z-A";
				icon = ArrowUpAZIcon;
				break;
			default:
				sortNamed = "Sắp xếp";
				icon = ArrowDownUpIcon;
				break;
		}

		return { name: sortNamed, icon };
	};

	const content = sortTitle().name;
	const Icon = sortTitle().icon;

	return (
		<Dropdown>
			<Tooltip>
				<TooltipContent content={content}>
					<DropdownTrigger asChild>
						<Button variant={isMobile ? "ghost" : "outline"}>
							<Icon />
							{!isMobile && <span>{content}</span>}
						</Button>
					</DropdownTrigger>
				</TooltipContent>
			</Tooltip>
			<DropdownBox>
				<DropdownItem onClick={() => setSort()}>
					<ArrowDownUpIcon />
					<span>Mặc định</span>
				</DropdownItem>
				<DropdownItem onClick={() => setSort("latest")}>
					<ArrowDownWideNarrowIcon />
					<span>Mới nhất</span>
				</DropdownItem>
				<DropdownItem onClick={() => setSort("oldest")}>
					<ArrowUpNarrowWideIcon />
					<span>Cũ nhất</span>
				</DropdownItem>
				<DropdownItem onClick={() => setSort("name_ASC")}>
					<ArrowDownAZIcon />
					<span>Sắp xếp theo tên A-Z</span>
				</DropdownItem>
				<DropdownItem onClick={() => setSort("name_DESC")}>
					<ArrowUpAZIcon />
					<span>Sắp xếp theo tên Z-A</span>
				</DropdownItem>
			</DropdownBox>
		</Dropdown>
	);
}
