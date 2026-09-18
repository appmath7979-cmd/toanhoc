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
	const [search, setSearch] = useState<string>("");
	const queryClient = useQueryClient();

	const { data, isLoading, isPlaceholderData } = useGetCustomers({
		page,
		search,
	});

	useEffect(() => {
		const hasMore = page < (data?.total_pages ?? 0);
		console.log(data?.total_pages)

		if (!isPlaceholderData && hasMore)
			queryClient.prefetchQuery({
				queryKey: ["customer", "list", page + 1],
				queryFn: () => getCustomer({ page, search }),
				staleTime: 5000,
			});
	}, [data, isPlaceholderData, page, search, queryClient]);

	if (isLoading) return <Pending />;
	if (!search && !data) return null;
	if (!search && data?.data?.length === 0) return <CustomerEmpty />;

	const handleSearch = (newSeach: string) => {
		setSearch(newSeach)
		setPage(1)
	}

	return (
		<Box>
			<Interactive search={search} onSearch={handleSearch} />
			<hr />
			<div className="space-y-6">
				<CustomerTable data={data?.data ?? []} />
				<Pagination
					page={data?.page ?? 0}
					length={data?.total_pages ?? 0}
					onSetPage={setPage}
				/>
			</div>
		</Box>
	);
}
