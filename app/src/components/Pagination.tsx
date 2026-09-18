import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { IconButton } from "./core/button/IconButton";

export default function Pagination({
	page = 1,
	length = 10,
	onSetPage,
}: {
	page?: number;
	length?: number;
	onSetPage: (p: number) => void;
}) {
	if (page === 0 || length <= 1) return null;

	const pageGenerate = (current: number, total: number) => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

		if (current <= 3) return [1, 2, 3, 4, "...", total];

		if (current >= total - 2)
			return [1, "...", total - 3, total - 2, total - 1, total];

		return [1, "...", current - 1, current, current + 1, "...", total];
	};

	const handleChangePage = (currPage: number | string) => {
		if (typeof currPage === "string") return;
		onSetPage(page);
	};

	const pages = pageGenerate(page, length);

	return (
		<div className="flex justify-center items-center gap-2">
			<IconButton
				variant="ghost"
				disabled={page === 1}
				onClick={() => handleChangePage(page - 1)}
			>
				<ChevronLeftIcon />
			</IconButton>
			{pages.map((p, i) => {
				const key = typeof p === "string" ? `ellipsis-${i}` : `page-${p}`;
				return (
					<IconButton
						key={key}
						variant="ghost"
						disabled={typeof p === "string"}
						onClick={() => handleChangePage(p)}
					>
						{p}
					</IconButton>
				);
			})}
			<IconButton
				variant="ghost"
				disabled={page === length}
				onClick={() => handleChangePage(page + 1)}
			>
				<ChevronRightIcon />
			</IconButton>
		</div>
	);
}
