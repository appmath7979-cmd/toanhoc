import Input from "@/components/core/field/Input";
import AddCustomer from "./AddCustomer";

export default function Interactive() {
	return (
		<div className="flex justify-between items-center">
			<Input
				placeholder="Tìm kiếm khách hàng theo tên/Số điện thoại..."
				className="w-full max-w-xl"
			/>
			<AddCustomer />
		</div>
	);
}
