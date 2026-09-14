import { getCustomer } from "@/api/customer.api";
import CustomerTable from "@/components/pages/customer/CustomerTable";
import CustomerTableActions from "@/components/pages/customer/CustomerTableActions";
import Interactive from "@/components/pages/customer/Interactive";
import Pagination from "@/components/Pagination";
import { useGetCustomers } from "@/hooks/query/useCustomerQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Customer() {
	const queryClient = useQueryClient();
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isPlaceholderData } = useGetCustomers({ page: 1 });

	useEffect(() => {
		if (!isPlaceholderData)
			queryClient.query({
				queryKey: ["customers", "list", page + 1],
				queryFn: () => getCustomer({ page }),
				staleTime: 5000,
			});
	}, []);

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
						<CustomerTable data={data?.data ?? []} />
						<Pagination
							page={data?.page ?? 0}
							length={data?.total_pages ?? 0}
							onSetPage={setPage}
						/>
					</>
				)}
			</div>
		</div>
	);
}
