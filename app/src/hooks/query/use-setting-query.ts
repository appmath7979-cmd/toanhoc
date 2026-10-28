import { useQuery } from "@tanstack/react-query";
import { getSettingByCustomerId } from "@/apis/setting.api";

function useGetSettingByCustomerId(id: string | undefined) {
  return useQuery({
    queryKey: ["settings", id],
    queryFn: () => getSettingByCustomerId(id ?? ""),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export { useGetSettingByCustomerId };
