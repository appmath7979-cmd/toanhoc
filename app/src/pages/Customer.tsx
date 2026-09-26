import SearchField from "@/components/system/SearchField";
import Button from "@/components/ui/button/Button";
import ButtonGroup from "@/components/ui/button/ButtonGroup";
import Checkbox from "@/components/ui/form/Checkbox";
import Field from "@/components/ui/form/Field";
import Input from "@/components/ui/form/Input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table/Table";
import { PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Customer() {
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
					<TableRow>
						<TableCell>
							<Checkbox />
						</TableCell>
						<TableCell>Tên khách hàng</TableCell>
						<TableCell>Hành động</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
