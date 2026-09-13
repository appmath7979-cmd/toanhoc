import Checkbox from "@/components/core/field/Checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/core/Table";
import Interactive from "@/components/pages/customer/Interactive";
import { CheckedState } from "radix-ui/checkbox";
import { useState } from "react";

export default function Customer() {
	const [check, setCheck] = useState<CheckedState>(false);
	return (
		<div className="space-y-4">
			<Interactive />
			<hr />
			<div>
				<Table>
					<TableHeader>
						<TableRow isHeader={true}>
							<TableHead>
								<Checkbox checked={check} onCheckedChange={setCheck} />
							</TableHead>
							<TableHead>Tên khách hàng</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableHead>
								<Checkbox />
							</TableHead>
							<TableCell>Bé Đan</TableCell>
							<TableCell>Bé Đan</TableCell>
							<TableCell>Bé Đan</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
