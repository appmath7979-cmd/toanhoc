import { Button } from "@/components/ui/button/Button";
import ButtonGroup from "@/components/ui/button/ButtonGriup";
import Flex from "@/components/ui/layouts/Flex";
import type { Sort } from "@/types/customer.type";
import DropdownActive from "./actions/DropdownActive";
import DropdownSort from "./actions/DropdownSort";

interface CustomerListActionsProps {
  guest: boolean;
  onSort: (sort: Sort | undefined) => void;
  onActive: (active: boolean | undefined) => void;
  onSelectCustomerType: (is_guest: boolean) => void;
}

export default function CustomerListActions({
  onActive,
  onSort,
  guest,
  onSelectCustomerType,
}: CustomerListActionsProps) {
  return (
    <Flex justify="justify-between" className="items-center">
      <ButtonGroup>
        <Button
          variant={guest ? "primary" : "ghost"}
          size="sm"
          onClick={() => onSelectCustomerType(true)}
        >
          Khách
        </Button>
        <Button
          variant={!guest ? "primary" : "ghost"}
          size="sm"
          onClick={() => onSelectCustomerType(false)}
        >
          Chủ
        </Button>
      </ButtonGroup>
      <Flex>
        <DropdownActive onActive={onActive} />
        <DropdownSort onSort={onSort} />
        <Button variant="ghost" danger>
          Xóa
        </Button>
      </Flex>
    </Flex>
  );
}
