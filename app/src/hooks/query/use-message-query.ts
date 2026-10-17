import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMessage } from "@/apis/message.api";
import type { CreateMessage } from "@/types/message.type";

function useCreateMessage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateMessage) => createMessage(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["messages"] });
			toast.success(data.message);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export { useCreateMessage };
