import { TableBody } from "@/components/ui/Table";
import { Customer } from "@/types/customer.type";
import CustomerItem from "./CustomerItem";

interface CustomerListProps {
	customers: Customer[];
}

export default function CustomerList({ customers }: CustomerListProps) {
	return (
		<TableBody>
			{customers.length > 0 &&
				customers.map((customer) => (
					<CustomerItem key={customer.id} customer={customer} />
				))}
		</TableBody>
	);
}
