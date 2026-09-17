import { Button } from "@/components/core/button/Button";
import { TooltipContent } from "@/components/core/tootltip/Tooltip";
import { cn } from "@/libs/utils/cn";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddCustomerBtn({ isMobile }: { isMobile: boolean }) {
	return (
		<TooltipContent content={"Thêm khách hàng"}>
			<Button
				className={cn(
					isMobile &&
						"absolute btn-icon size-10 bottom-24 right-4 [&_svg]:size-8 bg-primary/20 text-primary hover:bg-primary/40",
				)}
				setChild
			>
				<Link to="/customer/add">
					<PlusIcon />
					{!isMobile && <span>Thêm khách hàng</span>}
					{isMobile && (
						<div className="absolute size-full dark:bg-white/10 rounded-md" />
					)}
				</Link>
			</Button>
		</TooltipContent>
	);
}
