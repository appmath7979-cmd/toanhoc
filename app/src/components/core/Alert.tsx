import { AlertDialog } from "radix-ui";
import { ReactNode } from "react";

function Alert({ children }: { children: ReactNode }) {
	return <AlertDialog.Root>{children}</AlertDialog.Root>;
}

function AlertTrigger({
	children,
	setChild,
}: {
	children: ReactNode;
	setChild?: boolean;
}) {
	return (
		<AlertDialog.Trigger asChild={setChild}>{children}</AlertDialog.Trigger>
	);
}

function AlertContent({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm rounded-md" />
			<AlertDialog.Content className="alert-content space-y-4">
				<div className="space-y-2">
					<AlertDialog.Title className="font-semibold text-lg">
						{title}
					</AlertDialog.Title>
					<AlertDialog.Description className="text-sm text-muted-foreground">
						{description}
					</AlertDialog.Description>
				</div>
				<div className="flex justify-end items-center gap-1">{children}</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	);
}

function AlertAction({
	children,
	setChild,
}: {
	children: ReactNode;
	setChild?: boolean;
}) {
	return (
		<AlertDialog.Action
			asChild={setChild}
			className="btn btn-default btn-danger"
		>
			{children}
		</AlertDialog.Action>
	);
}

function AlertCancel({
	children,
	setChild,
}: {
	children: ReactNode;
	setChild?: boolean;
}) {
	return (
		<AlertDialog.Cancel
			asChild={setChild}
			className="btn btn-default btn-ghost"
		>
			{children}
		</AlertDialog.Cancel>
	);
}

export { Alert, AlertAction, AlertCancel, AlertContent, AlertTrigger };
