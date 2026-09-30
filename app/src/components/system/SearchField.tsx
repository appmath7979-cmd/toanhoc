import { SearchIcon } from "lucide-react";
import Field from "../ui/form/Field";
import Input from "../ui/form/Input";
import Description from "../ui/typography/Description";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchField({
	value,
	onValueChange,
	content,
}: {
	value: string;
	onValueChange: (val: string) => void;
	content?: string;
}) {
	const [search, setSearch] = useState<string>(value);
	const debounced = useDebounce({ value: search });

	useEffect(() => {
		onValueChange(debounced);
	}, [debounced]);

	return (
		<Field className="search">
			<SearchIcon className="absolute top-1/2 left-1 -translate-y-1/2" />
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full"
				placeholder="Tìm kiếm Tên hoặc Số điện thoại khách hàng"
			/>
			<Description className="absolute top-1/2 right-1 -translate-y-1/2 z-10 px-1 py0.5 bg-muted font-medium rounded-md">
				{content}
			</Description>
		</Field>
	);
}
