import { Button } from "@/components/ui/Button";
import { Link, useParams } from "react-router-dom";

export default function CustomerDetail() {
	const { id } = useParams();

	if (!id) return;

	return (
		<div>
			<Button>
				<Link to={`/customers/${id}/message`}>Thêm tin nhắn mới</Link>
			</Button>
		</div>
	);
}
