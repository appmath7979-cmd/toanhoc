import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createCustomerLimit, getCustomerLimit } from "@/apis/limit.api";
import type {
  CreateCustomerLimit,
  CustomerLimitQuery,
} from "@/types/limit.type";

function useGetCustomerLimit({
  day,
  id,
  retry,
}: CustomerLimitQuery & { retry?: number }) {
  return useQuery({
    queryKey: ["customer-limit", id, day],
    queryFn: () => getCustomerLimit({ day, id }),
    enabled: !!id,
    retry,
    staleTime: 5 * 60 * 1000,
  });
}

function useCreateCustomerLimit(customerId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateCustomerLimit) => createCustomerLimit(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customer-limit"] });
      toast.success(data.message);
      navigate(`/customers/${customerId}`);
    },
    onError: (err) => toast.error(err.message),
  });
}

export { useCreateCustomerLimit, useGetCustomerLimit };
