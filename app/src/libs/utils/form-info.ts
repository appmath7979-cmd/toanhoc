import { toast } from "sonner";

export function formState(isSuccess: boolean, msg: string) {
	if (isSuccess) {
		toast.success(msg);
	} else toast.error(msg);
}
