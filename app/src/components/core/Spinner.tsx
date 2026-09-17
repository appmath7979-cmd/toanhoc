import { cn } from "@/libs/utils/cn";
import { Loader2Icon, LucideProps } from "lucide-react";


export default function Spinner({ className, ...props }: LucideProps) {
  return (
    <Loader2Icon className={cn("animate-spin", className)} {...props} />
  )
}
