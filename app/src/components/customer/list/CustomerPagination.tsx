import { Pagination, PaginationItem } from "@/components/ui/Pagination";
import { ChevronFirstIcon, ChevronLastIcon } from "lucide-react";
import { useMemo } from "react";

interface CustomerPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function CustomerPagination({
	currentPage,
	totalPages,
	onPageChange,
}: CustomerPaginationProps) {
	if (totalPages <= 1) return null;

	const pages = useMemo(() => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		} else {
			if (currentPage < 4) return [1, 2, 3, 4, "...", totalPages];
			else if (currentPage > totalPages - 4)
				return [
					1,
					"...",
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				];
			else
				return [
					1,
					"...",
					currentPage - 1,
					currentPage,
					currentPage + 1,
					"...",
					totalPages,
				];
		}
	}, [currentPage, totalPages]);

	return (
		<Pagination>
			<PaginationItem
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<ChevronFirstIcon />
				<span>Trang trước</span>
			</PaginationItem>
			{pages.map((page) => (
				<PaginationItem
					key={page}
					disabled={page === "..."}
					onClick={() => onPageChange(Number(page))}
				>
					{page}
				</PaginationItem>
			))}
			<PaginationItem
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<ChevronLastIcon />
				<span>Trang sau</span>
			</PaginationItem>
		</Pagination>
	);
}
