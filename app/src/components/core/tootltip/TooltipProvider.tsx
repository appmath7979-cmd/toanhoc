import { Tooltip } from "radix-ui";
import { TooltipProviderProps } from "radix-ui/tooltip";

export default function TooltipProvider({ ...props }: TooltipProviderProps) {
	return <Tooltip.Provider {...props} />;
}
