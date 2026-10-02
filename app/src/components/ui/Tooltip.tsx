import { Tooltip as T } from "radix-ui";
import { ReactNode } from "react";

interface TooltipProps {
	children: ReactNode;
	content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
	return (
		<T.Provider delayDuration={300}>
			<T.Root>
				<T.Trigger asChild>{children}</T.Trigger>
				<T.Content>{content}</T.Content>
			</T.Root>
		</T.Provider>
	);
}
