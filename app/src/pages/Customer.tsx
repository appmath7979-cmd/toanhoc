import CustomerTable from "@/components/pages/customer/CustomerTable";
import CustomerTableActions from "@/components/pages/customer/CustomerTableActions";
import Interactive from "@/components/pages/customer/Interactive";

export default function Customer() {
	return (
		<div className="space-y-4">
			<Interactive />
			<hr />
			<div>
				<CustomerTableActions />
				<CustomerTable />
			</div>
		</div>
	);
}
