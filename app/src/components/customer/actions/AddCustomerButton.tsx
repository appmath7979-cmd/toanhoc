import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddCustomerButton() {
	return (
		<Button setChild>
			<Link to="/customers/add">
				<PlusIcon />
				<span>Thêm khách hàng</span>
			</Link>
		</Button>
	);
}
