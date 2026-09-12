import { useAppStore } from "@lavaz/store";
import { IconButton } from "../button/IconButton";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { store } from "@/store/store";

export function SidebarTrigger() {
	const [isExpand, { setExpand }] = useAppStore(
		store.sidebar,
		(s) => s.isExpand,
	);

	return (
		<IconButton onClick={setExpand}>
			{isExpand ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
		</IconButton>
	);
}
