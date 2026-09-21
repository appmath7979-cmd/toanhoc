import Checkbox from "@/components/core/field/Checkbox";
import { TableCell, TableRow } from "@/components/core/Table";
import { CustomerListItemRes } from "@/types/customer.type";
import CustomerAction from "./CustomerAction";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";

export default function CustomerTableItem({
	item,
}: {
	item: CustomerListItemRes;
}) {
	const [selected, { setSelected }] = useAppStore(
		store.customer,
		(s) => s.selected,
	);
	const { full_name, id, guest, phone_number } = item;

	const handleSelect = () => {
		setSelected(id);
	};

	const isCheck = selected.includes(id);

	return (
		<TableRow>
			<TableCell>
				<Checkbox checked={isCheck} onCheckedChange={handleSelect} />
			</TableCell>
			<TableCell>{full_name}</TableCell>
			<TableCell className="text-end">
				<CustomerAction
					id={id}
					full_name={full_name}
					phone_number={phone_number}
					guest={guest}
					onSelected={setSelected}
				/>
			</TableCell>
		</TableRow>
	);
}
