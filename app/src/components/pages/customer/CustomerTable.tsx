import Checkbox from "@/components/core/field/Checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/Table";

export default function CustomerTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow isHeader={true}>
          <TableHead className="w-10">
            <Checkbox />
          </TableHead>
          <TableHead>Tên khách hàng</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>Bé Đan</TableCell>
          <TableCell>Bé Đan</TableCell>
          <TableCell>Bé Đan</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
