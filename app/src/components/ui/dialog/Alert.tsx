import { AlertDialog } from "radix-ui";
import { ReactNode } from "react";

function Alert({ children }: { children: ReactNode }) {
	return <AlertDialog.Root>{children}</AlertDialog.Root>;
}

function AlertTrigger({ children }: { children: ReactNode }) {
	return <AlertDialog.Trigger>{children}</AlertDialog.Trigger>;
}

function AlertContent({ children }: { children: ReactNode }) {
	return (
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
			<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 bg-accent w-[90vw] max-w-125 p-4 ">
				{children}
			</AlertDialog.Content>
		</AlertDialog.Portal>
	);
}

function AlertHeader({ children }: { children: ReactNode }) {
	return <div>{children}</div>;
}

function AlertTitle({ children }: { children: ReactNode }) {
	return <AlertDialog.Title>{children}</AlertDialog.Title>;
}

function AlertDescription({ children }: { children: ReactNode }) {
	return <AlertDialog.Description>{children}</AlertDialog.Description>;
}

function AlertActions({ children }: { children: ReactNode }) {
	return <div>{children}</div>;
}

function AlertCancel({ children }: { children: ReactNode }) {
	return <AlertDialog.Cancel>{children}</AlertDialog.Cancel>;
}

function AlertAction({
	children,
	...props
}: AlertDialog.AlertDialogActionProps) {
	return <AlertDialog.Action {...props}>{children}</AlertDialog.Action>;
}

export {
	Alert,
	AlertAction,
	AlertActions,
	AlertCancel,
	AlertContent,
	AlertDescription,
	AlertHeader,
	AlertTitle,
	AlertTrigger,
};
