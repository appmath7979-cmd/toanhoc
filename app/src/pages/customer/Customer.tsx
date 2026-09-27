import SearchField from "@/components/system/SearchField";
import { Button } from "@/components/ui/button/Button";
import ButtonGroup from "@/components/ui/button/ButtonGroup";
import Checkbox from "@/components/ui/form/Checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table/Table";
import { useQueryCustomer } from "@/hooks/queries/use-customer-query";
import { BoxSelectIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Pending from "../Pending";

export default function Customer() {
	const { data, isPending } = useQueryCustomer({ page: 1, guest: true });

	if (isPending) return <Pending />;

	if (!data) return;

	return (
		<div className="container py-4">
			<div>
				<SearchField />
				<Button setChild>
					<Link to={"/customer/add"}>
						<PlusIcon />
						<span>Thêm khách hàng</span>
					</Link>
				</Button>
			</div>
			<div>
				<ButtonGroup>
					<Button>Khách</Button>
					<Button>Chủ</Button>
				</ButtonGroup>
				<div>
					<Button variant="outline" danger>
						<TrashIcon />
						<span>Trạng thái</span>
					</Button>
					<Button variant="outline" danger>
						<TrashIcon />
						<span>Sắp xếp</span>
					</Button>
					<Button variant="outline" danger>
						<TrashIcon />
						<span>Xóa</span>
					</Button>
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Checkbox />
						</TableHead>
						<TableHead>Tên khách hàng</TableHead>
						<TableHead>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!data.data || data.data.length === 0 ? (
						<TableRow>
							<TableCell>
								<BoxSelectIcon />
								<div>
									<p>Chưa có khách hàng nào</p>
									<Button setChild>
										<Link to={"/customer/add"}>
											<PlusIcon />
											<span>Thêm khách hàng</span>
										</Link>
									</Button>
								</div>
							</TableCell>
						</TableRow>
					) : (
						data.data.map((customer) => (
							<TableRow key={customer.id}>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>{customer.full_name}</TableCell>
								<TableCell>{customer.full_name}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
