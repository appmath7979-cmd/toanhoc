import Input from "@/components/core/field/Input";
import AddCustomerBtn from "./AddCustomerBtn";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils/cn";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function Interactive({
	search,
	onSearch,
}: {
	search: string;
	onSearch: (value: string) => void;
}) {
	const isMobile = useMobile(1028);
	const [value, setValue] = useState<string>(search);

	const debounced = useDebounce({ value });

	useEffect(() => {
		onSearch(debounced);
	}, [debounced]);

	console.log("re-render");

	return (
		<div className="flex justify-between items-center">
			<Input
				placeholder="Tìm kiếm khách hàng theo tên/Số điện thoại..."
				className={cn("w-full max-w-xl", isMobile && "max-w-full")}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<AddCustomerBtn isMobile={isMobile} />
		</div>
	);
}
