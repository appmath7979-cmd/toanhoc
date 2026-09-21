import { ChevronLeftIcon } from "lucide-react";
import { IconButton } from "../core/button/IconButton";
import { Tooltip, TooltipContent } from "../core/tootltip/Tooltip";
import { ComponentProps } from "react";

export default function BackBtn({ onClick }: ComponentProps<"button">) {
	const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(e);
		}
		window.history.back();
	};
	return (
		<Tooltip>
			<TooltipContent content="Quay lại">
				<IconButton variant="ghost" onClick={handleBack}>
					<ChevronLeftIcon />
				</IconButton>
			</TooltipContent>
		</Tooltip>
	);
}
