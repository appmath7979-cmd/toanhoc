import { Button } from "@/components/core/button/Button";
import { IconButton } from "@/components/core/button/IconButton";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { TrashIcon } from "lucide-react";

export default function Delete({ isMobile }: { isMobile: boolean }) {
	const [selected] = useAppStore(store.customer, (s) => s.selected);

	if (isMobile)
		return (
			<IconButton variant={"ghost"} disabled={selected.length === 0}>
				<TrashIcon />
			</IconButton>
		);

	return (
		<Button variant={"danger"} disabled={selected.length === 0}>
			<TrashIcon />
			<span>Xóa</span>
		</Button>
	);
}
