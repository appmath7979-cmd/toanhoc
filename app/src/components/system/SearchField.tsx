import { SearchIcon } from "lucide-react";
import Field from "../ui/form/Field";
import Input from "../ui/form/Input";

export default function SearchField() {
	return (
		<Field className="search">
			<SearchIcon />
			<Input placeholder="Tìm kiếm Tên hoặc Số điện thoại khách hàng" />
			<span>1 trong 10 kết quả</span>
		</Field>
	);
}
