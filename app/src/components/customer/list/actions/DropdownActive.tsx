import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/components/ui/Dropdown";
import { cn } from "@/libs/utils/cn";
import { memo } from "react";

interface ActiveItem {
	label: string;
	value: boolean | undefined;
}

const actives: ActiveItem[] = [
	{
		label: "Mặc định",
		value: undefined,
	},
	{
		label: "Hoạt động",
		value: true,
	},
	{
		label: "Ngưng hoạt động",
		value: false,
	},
];

const DropdownActive = memo(
	({ onActive }: { onActive: (value: boolean | undefined) => void }) => {
		return (
			<Dropdown>
				<DropdownTrigger>Trạng thái</DropdownTrigger>
				<DropdownContent>
					{actives.map((active) => (
						<DropdownItem
							key={`active_${active.label}`}
							onClick={() => onActive(active.value)}
						>
							<span
								className={cn(
									"block size-2.5 bg-amber-600 rounded-full",
									active.value && "bg-emerald-600",
									active.value === false && "bg-gray-400",
								)}
							/>
							<p>{active.label}</p>
						</DropdownItem>
					))}
				</DropdownContent>
			</Dropdown>
		);
	},
);

export default DropdownActive;
