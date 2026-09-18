import { ChevronLeftIcon } from "lucide-react";
import { IconButton } from "../core/button/IconButton";
import { Tooltip, TooltipContent } from "../core/tootltip/Tooltip";

export default function BackBtn() {
  return (
    <Tooltip>
      <TooltipContent content="Quay lại">
        <IconButton variant="ghost" onClick={() => window.history.back()}>
          <ChevronLeftIcon />
        </IconButton>
      </TooltipContent>
    </Tooltip>
  )
}
