import { Tooltip as T } from "radix-ui";
import { ReactNode } from "react";

interface TooltipProps {
	children: ReactNode;
	content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
	return (
		<T.Provider>
			<T.Root>
				<T.Trigger asChild>{children}</T.Trigger>
				<T.Portal>
					<T.Content className="bg-background px-4 py-3 rounded-md text-sm border border-border leading-0.5 font-medium shadow-md">
						{content}
						<T.Arrow className="fill-background shadow-md" />
					</T.Content>
				</T.Portal>
			</T.Root>
		</T.Provider>
	);
}
