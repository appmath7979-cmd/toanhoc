import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";

export default function AddCustomerButton() {
  return (
    <Button setChild>
      <Link to="/customers/add">
        <PlusIcon />
        <span>Thêm khách hàng</span>
      </Link>
    </Button>
  );
}
