import { Region } from "@/types/region.type";
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "../ui/Dropdown";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";

interface RegionDropdown {
	label: string;
	value: Region;
}

const regions: RegionDropdown[] = [
	{
		label: "Miền Bắc",
		value: "mb",
	},
	{
		label: "Miền Trung",
		value: "mt",
	},
	{
		label: "Miền Nam",
		value: "mn",
	},
];

export default function RegionDropdown() {
	const [{ label }, { setValue }] = useAppStore(store.region, (s) => s);
	return (
		<Dropdown>
			<DropdownTrigger>{label}</DropdownTrigger>
			<DropdownContent>
				{regions.map((r) => (
					<DropdownItem
						key={`dropdown-${r.value}`}
						onClick={() => setValue(r.value)}
					>
						{r.value}
					</DropdownItem>
				))}
			</DropdownContent>
		</Dropdown>
	);
}
