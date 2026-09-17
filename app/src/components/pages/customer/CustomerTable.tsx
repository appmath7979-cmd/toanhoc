import Checkbox from "@/components/core/field/Checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/core/Table";
import { CustomerListItemRes } from "@/types/customer.type";
import { PackageOpenIcon } from "lucide-react";
import CustomerTableItem from "./CustomerTableItem";
import CustomerTableActions from "./CustomerTableActions";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { useEffect } from "react";

export default function CustomerTable({
	data,
}: {
	data: CustomerListItemRes[];
}) {
	const [
		{ isSelectAll, selected },
		{ setToggleSelectAll, setSelectAll, setIsSelectAll },
	] = useAppStore(store.customer, (s) => s);

	useEffect(() => {
		if (isSelectAll && data.length > 0) {
			const ids = data.map((item) => item.id);
			setSelectAll(ids);
		} else setSelectAll([]);
	}, [isSelectAll, data]);

	useEffect(() => {
		if (selected.length === data.length && data.length > 0)
			setIsSelectAll(true);
		else setIsSelectAll(false);
	}, [selected, data]);

	console.log("table render");
	return (
		<>
			<CustomerTableActions />
			<Table>
				<TableHeader>
					<TableRow isHeader={true}>
						<TableHead className="w-10">
							<Checkbox
								checked={isSelectAll}
								onCheckedChange={setToggleSelectAll}
							/>
						</TableHead>
						<TableHead>Tên khách hàng</TableHead>
						<TableHead className="text-end">Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.length === 0 ? (
						<TableRow isHeader>
							<TableCell colSpan={4}>
								<div className="py-10 flex flex-col gap-2 justify-center items-center">
									<div className="size-10 rounded-md bg-surface flex justify-center items-center">
										<PackageOpenIcon />
									</div>
									<p className="font-medium">Chưa có khách hàng nào</p>
								</div>
							</TableCell>
						</TableRow>
					) : (
						data?.map((item) => (
							<CustomerTableItem
								key={item.id}
								item={item}
								isSelectAll={selected.some((s) => s === item.id)}
							/>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
}
