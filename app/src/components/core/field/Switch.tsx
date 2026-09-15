import { Switch as S } from "radix-ui";

export default function Switch({
	checked,
	onCheckedChange,
}: {
	checked?: boolean;
	onCheckedChange: (value: boolean) => void;
}) {
	return (
		<>
			<S.Root
				checked={checked}
				onCheckedChange={onCheckedChange}
				className="relative w-11 h-6 bg-muted rounded-full border transition-colors duration-200 data-[state=checked]:bg-primary overflow-hidden outline-none cursor-pointer"
			>
				<S.Thumb className="absolute top-1/2 left-0.5 size-5 bg-muted-foreground rounded-full transition-transform duration-200 translate-x-0 -translate-y-1/2 data-[state=checked]:translate-x-4.5 shadow-sm" />
			</S.Root>
		</>
	);
}
