import {
	Alert,
	AlertAction,
	AlertActions,
	AlertCancel,
	AlertContent,
	AlertDescription,
	AlertHeader,
	AlertTitle,
	AlertTrigger,
} from "@/components/ui/dialog/Alert";
import { TrashIcon } from "lucide-react";
import { AlertDialog } from "radix-ui";

interface DeleteAlertProps extends AlertDialog.AlertDialogActionProps {
	title: string;
	description: string;
}

export default function DeleteAlert({
	title,
	description,
	...props
}: DeleteAlertProps) {
	return (
		<Alert>
			<AlertTrigger className="btn btn-ghost--danger">
				<TrashIcon />
				<span>Xóa</span>
			</AlertTrigger>
			<AlertContent>
				<AlertHeader>
					<AlertTitle>{title}</AlertTitle>
					<AlertDescription>{description}</AlertDescription>
					<AlertActions>
						<AlertCancel>Hủy bỏ</AlertCancel>
						<AlertAction {...props}>Xác nhận xóa</AlertAction>
					</AlertActions>
				</AlertHeader>
			</AlertContent>
		</Alert>
	);
}
