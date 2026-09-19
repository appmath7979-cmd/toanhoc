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
import { useEffect, useMemo } from "react";
import CustomerTab from "./actions/CustomerTab";

export default function CustomerTable({
	data,
}: {
	data: CustomerListItemRes[];
}) {
	const [{ isSelectAll, selected }, { setIsSelectAll, setSelectAll }] =
		useAppStore(store.customer, (s) => s);

	useEffect(() => {
		if (selected.length === data.length && data.length > 0)
			setIsSelectAll(true);
		else setIsSelectAll(false);
	}, [data, selected]);

	const handleSelectAll = () => {
		if (!isSelectAll) {
			const ids = data.map((item) => item.id);
			setSelectAll(ids);
		} else setSelectAll([]);
		setIsSelectAll(!isSelectAll);
	};

	const ids = useMemo((): string[] => {
		if (!data) return [];
		return data.map((item) => item.id);
	}, []);

	return (
		<>
			<CustomerTableActions ids={ids} />
			<div className="space-y-2">
				<CustomerTab />
				<Table>
					<TableHeader>
						<TableRow isHeader={true}>
							<TableHead className="w-10">
								<Checkbox
									checked={isSelectAll}
									onCheckedChange={handleSelectAll}
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
								<CustomerTableItem key={item.id} item={item} />
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
