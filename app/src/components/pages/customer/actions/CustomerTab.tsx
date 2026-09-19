import { Button } from "@/components/core/button/Button";
import ButtonGroup from "@/components/core/button/ButtonGroup";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { memo } from "react";

const CustomerTab = memo(() => {
	const [guest, { setGuest }] = useAppStore(
		store.customerPagination,
		(s) => s.guest,
	);
	return (
		<ButtonGroup>
			<Button
				variant={guest === "true" ? "primary" : "ghost"}
				onClick={() => setGuest("true")}
			>
				Khách
			</Button>
			<Button
				variant={guest === "true" ? "ghost" : "primary"}
				onClick={() => setGuest("false")}
			>
				Chủ
			</Button>
		</ButtonGroup>
	);
});

export default CustomerTab;
