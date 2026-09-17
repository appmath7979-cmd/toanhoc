import { Button } from "@/components/core/button/Button";
import { IconButton } from "@/components/core/button/IconButton";
import { ArrowDownUpIcon } from "lucide-react";

export default function Sort({ isMobile }: { isMobile: boolean }) {
	if (isMobile)
		return (
			<IconButton variant={"ghost"}>
				<ArrowDownUpIcon />
			</IconButton>
		);
	return (
		<Button variant="outline">
			<ArrowDownUpIcon />
			<span>Sắp xếp</span>
		</Button>
	);
}
