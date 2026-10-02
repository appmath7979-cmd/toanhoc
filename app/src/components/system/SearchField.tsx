import { SearchIcon } from "lucide-react";
import Input from "../ui/form/Input";
import { ComponentProps, useState } from "react";

interface SearchFieldProps extends ComponentProps<"input"> {
	value?: string;
}

export default function SearchField({
	value,
	placeholder,
	onChange,
}: SearchFieldProps) {
	const [search, setSearch] = useState<string>(value ?? "");

	return (
		<div className="search">
			<SearchIcon className="" />
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full"
				placeholder={placeholder ?? "Search..."}
			/>
		</div>
	);
}
