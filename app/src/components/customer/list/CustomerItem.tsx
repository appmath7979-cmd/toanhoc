import Checkbox from "@/components/ui/form/Checkbox";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Customer } from "@/types/customer.type";
import ItemActions from "../actions/ItemActions";

interface CustomerItemProps {
	customer: Customer;
}

export default function CustomerItem({ customer }: CustomerItemProps) {
	return (
		<TableRow>
			<TableCell>
				<Checkbox />
			</TableCell>
			<TableCell>{customer.full_name}</TableCell>
			<TableCell>
				<ItemActions customerId={customer.id} />
			</TableCell>
		</TableRow>
	);
}
