import { Attributes, ReactNode } from "react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/libs/utils/cn";
import { Tabs as T } from "radix-ui";

interface TabsProps {
	children: ReactNode;
	defaultValue: string;
	value: string;
	onValueChange?: (value: string) => void;
	direction?: "vertical" | "horizontal";
}

function Tabs({
	children,
	defaultValue,
	direction = "horizontal",
	onValueChange,
	value,
}: TabsProps) {
	return (
		<T.Root
			defaultValue={defaultValue}
			orientation={direction}
			value={value}
			onValueChange={onValueChange}
		>
			{children}
		</T.Root>
	);
}

function TabsList({ children, loop = true }: { children: ReactNode; loop?: boolean }) {
	return <T.List loop={loop}>{children}</T.List>;
}

function TabsTrigger({
	children,
	setChild = false,
	value,
	className,
}: {

	children?: ReactNode;
	setChild?: boolean;
	value: string;
	className?: string;
} & Attributes) {
	return (
		<T.Trigger
			asChild={setChild}
			value={value}
			className={cn("", className)}
		>
			{children}
		</T.Trigger>
	);
}

function TabsContent({
	children,
	value,
}: {
	children: ReactNode;
	value: string;
}) {
	return <T.Content value={value}>{children}</T.Content>;
}

export { Tabs, TabsContent, TabsTrigger, TabsList };
