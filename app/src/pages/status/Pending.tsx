import Box from "@/components/core/Box";
import Spinner from "@/components/core/Spinner";

interface PendingProps {
  className?: string;
}

export default function Pending({ className = "" }: PendingProps) {
  return (
    <Box className={`h-[calc(100dvh-45px)] grid place-items-center ${className}`}>
      <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground animate-in fade-in-50 duration-300">
        {/* Icon xoay vòng mượt mà */}
        <Spinner className="size-8 animate-spin text-primary" strokeWidth={2} />

        {/* Dòng chữ trạng thái */}
        <p className="text-sm font-medium tracking-wide animate-pulse">
          Đang lấy dữ liệu! Vui lòng chờ trong giây lát...
        </p>
      </div>
    </Box>
  );
}