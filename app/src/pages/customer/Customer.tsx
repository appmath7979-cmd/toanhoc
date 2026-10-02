import AddCustomerButton from "@/components/customer/actions/AddCustomerButton";
import CustomerList from "@/components/customer/list/CustomerList";
import CustomerPagination from "@/components/customer/list/CustomerPagination";
import SearchField from "@/components/system/SearchField";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/form/Checkbox";
import Container from "@/components/ui/layouts/Container";
import Flex from "@/components/ui/layouts/Flex";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useGetManyCustomer } from "@/hooks/query/use-customer-query";
import { useState } from "react";

export default function Customer() {
	const [page, setPage] = useState<number>(1);
	const { data, isPending, isError } = useGetManyCustomer({
		page,
		guest: true,
	});

	if (isError) return <div>Đã xảy ra lỗi</div>;

	if (isPending) return <div>Loading...</div>;

	return (
		<Container>
			<Flex justify="between">
				<SearchField placeholder="Tìm kiếm khách hàng..." />
				<AddCustomerButton />
			</Flex>
			<Flex display="inline-flex" justify="between">
				<Button>Khách</Button>
				<Flex>
					<Button>Trạng thái</Button>
					<Button>Sắp xếp</Button>
					<Button>Xóa</Button>
				</Flex>
			</Flex>
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
				totalPages={10}
				currentPage={page}
				onPageChange={setPage}
			/>
		</Container>
	);
}
