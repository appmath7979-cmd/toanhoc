import Box from "@/components/core/Box";
import { Button } from "@/components/core/button/Button";
import { PackageOpenIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomerEmpty() {
	return (
		<Box className="h-[calc(100dvh-45px)] grid place-items-center bg-linear-to-b from-transparent to-primary/5">
			<div className="text-center flex flex-col justify-center items-center gap-6 max-w-md px-4 animate-in fade-in-50 duration-500">
				{/* Phần Icon được bọc trong khung tròn có hiệu ứng nền */}
				<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner transition-transform hover:scale-105 duration-300">
					<PackageOpenIcon size={36} strokeWidth={1.5} />
				</div>

				{/* Tiêu đề và phụ đề */}
				<div className="flex flex-col justify-center items-center gap-2">
					<h3 className="font-bold text-xl tracking-tight text-foreground">
						Chưa có khách hàng nào
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						Hệ thống chưa ghi nhận thông tin khách hàng. Hãy bắt đầu bằng việc
						tạo khách hàng mới để quản lý dữ liệu.
					</p>
				</div>

				<div className="pt-2">
					<Button
						size="lg"
						className="w-fit shadow-md hover:shadow-lg transition-all duration-200 gap-2"
						setChild
					>
						<Link to={"/customer/add"} className="flex items-center gap-2">
							<PlusIcon size={18} />
							<span>Thêm khách hàng mới</span>
						</Link>
					</Button>
				</div>
			</div>
		</Box>
	);
}
