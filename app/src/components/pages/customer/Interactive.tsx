import Input from "@/components/core/field/Input";
import AddCustomerBtn from "./AddCustomerBtn";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils/cn";

export default function Interactive() {
	const isMobile = useMobile(1028);

	return (
		<div className="flex justify-between items-center">
			<Input
				placeholder="Tìm kiếm khách hàng theo tên/Số điện thoại..."
				className={cn("w-full max-w-xl", isMobile && "max-w-full")}
			/>
			<AddCustomerBtn isMobile={isMobile} />
		</div>
	);
}
