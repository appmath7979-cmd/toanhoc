import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/components/ui/Dropdown";
import { type Sort } from "@/types/customer.type";
import {
	ArrowDownAZIcon,
	ArrowDownWideNarrowIcon,
	ArrowUpAZIcon,
	ArrowUpWideNarrowIcon,
	ChevronDownIcon,
	FunnelIcon,
	FunnelXIcon,
} from "lucide-react";
import { ElementType, memo } from "react";

interface SortItem {
	label: string;
	value: Sort | undefined;
	icon: ElementType;
}

interface DropdownSortProps {
	onSort: (value?: Sort) => void;
}

const sorts: SortItem[] = [
	{
		label: "Sắp xếp",
		value: undefined,
		icon: FunnelXIcon,
	},
	{
		label: "Theo tên A-Z",
		value: "name_ASC",
		icon: ArrowDownAZIcon,
	},
	{
		label: "Theo tên Z-A",
		value: "name_DESC",
		icon: ArrowUpAZIcon,
	},
	{
		label: "Mới nhất",
		value: "latest",
		icon: ArrowDownWideNarrowIcon,
	},
	{
		label: "Cũ nhất",
		value: "oldest",
		icon: ArrowUpWideNarrowIcon,
	},
];

const DropdownSort = memo(({ onSort }: DropdownSortProps) => {
	return (
		<Dropdown>
			<DropdownTrigger>
				<FunnelIcon />
				<span>Sắp xếp</span>
				<ChevronDownIcon />
			</DropdownTrigger>
			<DropdownContent>
				{sorts.map((sort) => {
					const Icon = sort.icon;
					return (
						<DropdownItem
							key={`sort_${sort.label}`}
							onClick={() => onSort(sort.value)}
						>
							<Icon />
							<p>{sort.label}</p>
						</DropdownItem>
					);
				})}
			</DropdownContent>
		</Dropdown>
	);
});

export default DropdownSort;
