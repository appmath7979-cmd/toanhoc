import { getCustomer } from "@/api/customer.api";
import Box from "@/components/core/Box";
import CustomerEmpty from "@/components/pages/customer/CustomerEmpty";
import CustomerTable from "@/components/pages/customer/CustomerTable";
import Interactive from "@/components/pages/customer/Interactive";
import Pagination from "@/components/Pagination";
import { useGetCustomers } from "@/hooks/query/useCustomerQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Pending from "../status/Pending";

export default function Customer() {
	const [page, setPage] = useState<number>(1);
	const queryClient = useQueryClient();

	const { data, isLoading, isPlaceholderData } = useGetCustomers({ page });

	useEffect(() => {
		if (!isPlaceholderData)
			queryClient.query({
				queryKey: ["customer", "list", page + 1],
				queryFn: () => getCustomer({ page }),
				staleTime: 5000,
			});
	}, []);

	if (!data) return null;

	if (data.data.length === 0) return <CustomerEmpty />;

	return (
		<Box>
			<Interactive />
			<hr />
			<div>
				{isLoading ? (
					<Pending />
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
		</Box>
	);
}
