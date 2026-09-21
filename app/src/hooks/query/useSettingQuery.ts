import { getSettingById } from "@/api/setting.api";
import { useQuery } from "@tanstack/react-query";

export function useGetSettingById(customerId: string) {
	return useQuery({
		queryKey: ["setting", customerId],
		queryFn: () => getSettingById(customerId),
	});
}
