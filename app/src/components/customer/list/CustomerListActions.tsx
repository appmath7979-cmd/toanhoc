import { Button } from "@/components/ui/Button";
import Flex from "@/components/ui/layouts/Flex";
import DropdownSort from "./actions/DropdownSort";
import { Sort } from "@/types/customer.type";
import DropdownActive from "./actions/DropdownActive";

interface CustomerListActionsProps {
	onSort: (sort: Sort | undefined) => void;
	onActive: (active: boolean | undefined) => void;
}

export default function CustomerListActions({
	onActive,
	onSort,
}: CustomerListActionsProps) {
	return (
		<Flex>
			<Button>Khách</Button>
			<Flex>
				<DropdownActive onActive={onActive} />
				<DropdownSort onSort={onSort} />
				<Button variant="ghost" danger>
					Xóa
				</Button>
			</Flex>
		</Flex>
	);
}
