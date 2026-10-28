import { useAppStore } from "@lavaz/store";
import { Link } from "react-router-dom";
import Checkbox from "@/components/ui/form/Checkbox";
import Flex from "@/components/ui/layouts/Flex";
import { TableCell, TableRow } from "@/components/ui/Table";
import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import type { Customer } from "@/types/customer.type";
import ItemActions from "../actions/ItemActions";

interface CustomerItemProps {
  customer: Customer;
}

export default function CustomerItem({ customer }: CustomerItemProps) {
  const [, { setSend }] = useAppStore(store.sendMessage, (s) => s.send);
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <Link
          to={`/customers/${customer.id}`}
          onClick={() => setSend(!customer.is_guest)}
        >
          <Flex className="gap-1 items-center">
            <div className={cn("size-3 rounded-full bg-gray-400")} />
            <p>{customer.full_name}</p>
          </Flex>
        </Link>
      </TableCell>
      <TableCell>
        <ItemActions customerId={customer.id} />
      </TableCell>
    </TableRow>
  );
}
