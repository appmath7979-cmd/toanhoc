import { Button } from "@/components/core/button/Button";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { SquareMousePointerIcon } from "lucide-react";

export default function SelectAll({ isMobile }: { isMobile: boolean }) {
  const [isSelectAll, { setToggleSelectAll }] = useAppStore(
    store.customer,
    (s) => s.isSelectAll,
  );

  return (
    <Button variant={isMobile ? "ghost" : "outline"} onClick={setToggleSelectAll}>
      <SquareMousePointerIcon />
      <span>{isSelectAll ? "Hủy chọn" : "Chọn tất cả"}</span>
    </Button>
  );
}
