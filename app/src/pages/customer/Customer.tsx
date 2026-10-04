import AddCustomerButton from "@/components/customer/actions/AddCustomerButton";
import CustomerList from "@/components/customer/list/CustomerList";
import CustomerListActions from "@/components/customer/list/CustomerListActions";
import CustomerPagination from "@/components/customer/list/CustomerPagination";
import SearchField from "@/components/system/SearchField";
import { Button } from "@/components/ui/Button";
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/components/ui/Dropdown";
import Checkbox from "@/components/ui/form/Checkbox";
import Container from "@/components/ui/layouts/Container";
import Flex from "@/components/ui/layouts/Flex";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useGetManyCustomer } from "@/hooks/query/use-customer-query";
import { Sort } from "@/types/customer.type";
import { ChevronDownIcon, FunnelIcon } from "lucide-react";
import { useCallback, useState } from "react";

export default function Customer() {
	const [page, setPage] = useState<number>(1);
	const [active, setActive] = useState<boolean | undefined>(undefined);
	const [sort, setSort] = useState<Sort | undefined>(undefined);
	const [search, setSearch] = useState<string>("");
	const { data, isPending, isError } = useGetManyCustomer({
		page,
		guest: true,
		sort,
		search,
		active,
	});

	const handleSearch = useCallback(
		(value: string) => {
			setSearch(value);
			if (page !== 1) setPage(1);
			if (active !== undefined) setActive(undefined);
			if (sort !== undefined) setSort(undefined);
		},
		[page, active, sort],
	);

	const handleActive = useCallback(
		(value: boolean | undefined) => {
			if (search) setSearch("");
			if (page !== 1) setPage(1);
			setActive(value);
			if (sort !== undefined) setSort(undefined);
		},
		[search, page, sort],
	);

	const handleSort = useCallback(
		(value: Sort | undefined) => {
			if (search) setSearch("");
			if (page !== 1) setPage(1);
			if (active !== undefined) setActive(undefined);
			setSort(value);
		},
		[search, page, active],
	);

	if (isError) return <div>Đã xảy ra lỗi</div>;

	if (isPending) return <div>Loading...</div>;

	return (
		<Container>
			<Flex justify="between">
				<SearchField
					placeholder="Tìm kiếm khách hàng..."
					value={search}
					onValueChange={handleSearch}
				/>
				<AddCustomerButton />
			</Flex>
			<CustomerListActions onActive={handleActive} onSort={handleSort} />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Checkbox />
						</TableHead>
						<TableHead>Tên khách hàng</TableHead>
						<TableHead>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<CustomerList customers={data?.data ?? []} />
			</Table>
			<CustomerPagination
				totalPages={data.total_page}
				currentPage={page}
				onPageChange={setPage}
			/>
		</Container>
	);
}
