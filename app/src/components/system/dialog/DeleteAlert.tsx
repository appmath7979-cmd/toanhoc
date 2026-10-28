import { TrashIcon } from "lucide-react";
import type { AlertDialog } from "radix-ui";
import type { ReactNode } from "react";
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

interface DeleteAlertProps extends AlertDialog.AlertDialogActionProps {
  title: string;
  description: string;
  children?: ReactNode;
  iconOnly?: boolean;
}

export default function DeleteAlert({
  title,
  description,
  children,
  iconOnly,
  ...props
}: DeleteAlertProps) {
  return (
    <Alert>
      {children ? (
        children
      ) : (
        <AlertTrigger className="btn btn-ghost--danger">
          <TrashIcon />
          {iconOnly || <span>Xóa</span>}
        </AlertTrigger>
      )}
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
