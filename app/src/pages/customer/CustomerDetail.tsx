import { useGetCustomerMessage } from "@/hooks/query/use-customer-query";
import { useParams } from "react-router-dom";

export default function CustomerDetail() {
  const { id } = useParams();

  if (!id) return

  const { data } = useGetCustomerMessage(id, "20/09/2026")

  return <div>CustomerDetail</div>;
}
