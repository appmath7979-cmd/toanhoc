import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReward, getReward } from "@/apis/reward.api";
import type { CreateReward } from "@/types/reward.type";

function useGetReward(at: string) {
  return useQuery({
    queryKey: ["reward", at],
    queryFn: () => getReward(at),
    enabled: !!at,
    retry: 0,
    staleTime: 60 * 6000,
  });
}

function useCreateReward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReward) => createReward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });
}

export { useCreateReward, useGetReward };
