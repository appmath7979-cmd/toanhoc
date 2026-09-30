import { ComponentProps } from "react";

export default function Input({
	className,
	...props
}: ComponentProps<"input">) {
	return <input {...props} />;
}
