import { toast } from "sonner";

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
  toast.info("Nội dung đã được sao chép vào clipboard!");
}
