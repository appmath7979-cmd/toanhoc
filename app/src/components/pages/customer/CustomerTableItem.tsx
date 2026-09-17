import Checkbox from "@/components/core/field/Checkbox";
import { TableCell, TableRow } from "@/components/core/Table";
import { CustomerListItemRes } from "@/types/customer.type";
import CustomerAction from "./CustomerAction";
import { useState } from "react";
import { CheckedState } from "radix-ui/checkbox";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";

export default function CustomerTableItem({
	item,
	isSelectAll,
}: {
	item: CustomerListItemRes;
	isSelectAll: boolean;
}) {
	const [, { setSelected }] = useAppStore(store.customer, (s) => s);
	const [select, setIsSelect] = useState<CheckedState>(false);
	const { full_name, id } = item;

	console.log(isSelectAll);

	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelectAll || select}
					onClick={() => setSelected(id)}
					onCheckedChange={setIsSelect}
				/>
			</TableCell>
			<TableCell>{full_name}</TableCell>
			<TableCell className="text-end">
				<CustomerAction />
			</TableCell>
		</TableRow>
	);
}
