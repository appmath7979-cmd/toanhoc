import CustomerTable from "@/components/pages/customer/CustomerTable";
import CustomerTableActions from "@/components/pages/customer/CustomerTableActions";
import Interactive from "@/components/pages/customer/Interactive";
import Pagination from "@/components/Pagination";
import { useGetCustomers } from "@/hooks/query/useCustomerQuery";

export default function Customer() {
	const { data, isLoading } = useGetCustomers({ page: 1 });

	return (
		<div className="space-y-4">
			<Interactive />
			<hr />
			<div>
				<CustomerTableActions />
				{isLoading ? (
					<>Loading...</>
				) : (
					<>
						<CustomerTable data={data ? data.data : []} />
						<Pagination
							page={data?.page ?? 0}
							length={data?.total_pages ?? 0}
						/>
					</>
				)}
			</div>
		</div>
	);
}
