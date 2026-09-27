import Spinner from "@/components/ui/Spinner";

export default function Pending() {
	return (
		<div className="absolute bg-white/80 backdrop-blur-md w-dvw h-dvh top-0 left-0">
			<div>
				<Spinner />
				<p>Đang tải dữ liệu...</p>
			</div>
		</div>
	);
}
