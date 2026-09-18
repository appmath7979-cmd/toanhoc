import { Button } from "@/components/core/button/Button";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { SquareMousePointerIcon } from "lucide-react";

export default function SelectAll({ isMobile, ids }: { isMobile: boolean, ids: string[] }) {
	const [isSelectAll, { setToggleSelectAll, setSelectAll }] = useAppStore(
		store.customer,
		(s) => s.isSelectAll,
	);

	const handleToggle = () => {
		if (isSelectAll) setSelectAll([])
		else setSelectAll(ids)
		setToggleSelectAll()
	}

	return (
		<Button
			variant={isMobile ? "ghost" : "outline"}
			onClick={handleToggle}
		>
			<SquareMousePointerIcon />
			<span>{isSelectAll ? "Hủy chọn" : "Chọn tất cả"}</span>
		</Button>
	);
}
