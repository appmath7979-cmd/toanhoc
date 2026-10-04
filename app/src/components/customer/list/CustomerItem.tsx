import Checkbox from "@/components/ui/form/Checkbox";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Customer } from "@/types/customer.type";
import ItemActions from "../actions/ItemActions";
import { cn } from "@/libs/utils/cn";
import Flex from "@/components/ui/layouts/Flex";
import { Link } from "react-router-dom";

interface CustomerItemProps {
	customer: Customer;
}

export default function CustomerItem({ customer }: CustomerItemProps) {
	return (
		<TableRow>
			<TableCell>
				<Checkbox />
			</TableCell>
			<TableCell>
				<Link to={`/customers/${customer.id}`}>
					<Flex className="gap-1 items-center">
						<div className={cn("size-3 rounded-full", customer.is_send ? "bg-emerald-500" : "bg-gray-400")} />
						<p>{customer.full_name}</p>
					</Flex>
				</Link>
			</TableCell>
			<TableCell>
				<ItemActions customerId={customer.id} />
			</TableCell>
		</TableRow>
	);
}
