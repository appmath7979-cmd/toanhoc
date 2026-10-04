import { SearchIcon } from "lucide-react";
import Input from "../ui/form/Input";
import { ComponentProps, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchFieldProps extends ComponentProps<"input"> {
	value?: string;
	onValueChange: (value: string) => void;
}

export default function SearchField({
	value,
	placeholder,
	onValueChange,
	...props
}: SearchFieldProps) {
	const [search, setSearch] = useState<string>(value ?? "");
	const debounced = useDebounce({ value: search });

	useEffect(() => {
		onValueChange(debounced);
	}, [debounced]);

	return (
		<div className="search">
			<SearchIcon className="" />
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full"
				placeholder={placeholder ?? "Search..."}
				{...props}
			/>
		</div>
	);
}
