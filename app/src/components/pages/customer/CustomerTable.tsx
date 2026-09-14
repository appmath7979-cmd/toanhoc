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

export default function CustomerTable({
	data,
}: {
	data: CustomerListItemRes[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow isHeader={true}>
					<TableHead className="w-10">
						<Checkbox />
					</TableHead>
					<TableHead>Tên khách hàng</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead>Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length === 0 ? (
					<TableRow isHeader>
						<TableCell colSpan={4}>
							<div className="py-10 flex flex-col gap-2 justify-center items-center">
								<div className="size-10 rounded-md bg-surface flex justify-center items-center">
									<PackageOpenIcon />
								</div>
								<p>Chưa có khách hàng nào</p>
							</div>
						</TableCell>
					</TableRow>
				) : (
					data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>
								<Checkbox />
							</TableCell>
							<TableCell>{item.full_name}</TableCell>
							<TableCell>{item.full_name}</TableCell>
							<TableCell>{item.full_name}</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
