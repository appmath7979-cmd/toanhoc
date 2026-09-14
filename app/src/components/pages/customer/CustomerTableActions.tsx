import { Button } from "@/components/core/button/Button";
import { TrashIcon } from "lucide-react";

export default function CustomerTableActions() {
  return <div className="pb-4 flex justify-between items-center">
    <div className="flex items-center gap-1">
      <Button variant="outline">
        <span>Chọn tất cả</span>
      </Button>
      <Button variant="outline">
        <span>Sắp xếp</span>
      </Button>
    </div>
    <Button variant="danger">
      <TrashIcon />
      <span>Xóa</span>
    </Button>
  </div>;
}
