import { AlertDialog } from "radix-ui";
import { ReactNode } from "react";

function Alert({ children }: { children: ReactNode }) {
	return <AlertDialog.Root>{children}</AlertDialog.Root>;
}

function AlertTrigger({ children, ...props }: AlertDialog.AlertDialogTriggerProps) {
	return <AlertDialog.Trigger {...props}>{children}</AlertDialog.Trigger>;
}

function AlertContent({ children }: { children: ReactNode }) {
	return (
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="bg-black/50 fixed inset-0 dialog-overlay--anim" />
			<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 bg-background w-[90vw] max-w-125 p-4 rounded-md shadow-md border border-border dialog-content--anim">
				{children}
			</AlertDialog.Content>
		</AlertDialog.Portal>
	);
}

function AlertHeader({ children }: { children: ReactNode }) {
	return <div className="space-y-2">{children}</div>;
}

function AlertTitle({ children }: { children: ReactNode }) {
	return (
		<AlertDialog.Title className="text-lg font-semibold">
			{children}
		</AlertDialog.Title>
	);
}

function AlertDescription({ children }: { children: ReactNode }) {
	return (
		<AlertDialog.Description className="text-sm font-medium tracking-wide text-muted-foreground leading-5">
			{children}
		</AlertDialog.Description>
	);
}

function AlertActions({ children }: { children: ReactNode }) {
	return (
		<div className="flex justify-end gap-2 items-center mt-8">{children}</div>
	);
}

function AlertCancel({ children }: { children: ReactNode }) {
	return (
		<AlertDialog.Cancel className="btn btn-ghost">
			{children}
		</AlertDialog.Cancel>
	);
}

function AlertAction({
	children,
	...props
}: AlertDialog.AlertDialogActionProps) {
	return (
		<AlertDialog.Action className="btn btn-danger" {...props}>
			{children}
		</AlertDialog.Action>
	);
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
