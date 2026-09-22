import BackBtn from "@/components/base/BackBtn";
import Box from "@/components/core/Box";
import CustomerForm from "@/components/pages/customer/form/CustomerForm";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";

export default function EditCustomer() {
	const [data, { setDefault }] = useAppStore(store.copyCustomer, (s) => s);
	return (
		<Box>
			<BackBtn onClick={setDefault} />
			<CustomerForm data={data} onReset={setDefault} />
		</Box>
	);
}
