import { ReactNode } from "react"
import { cn } from "../../../utils/cn"

interface FieldProps {
  children: ReactNode
  direction?: "horizontal" | "vertical"
}

export function Field({ children, direction = "vertical" }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", direction === "horizontal" && "flex-row md:items-center max-md:flex-col")}>{children}</div>
  )
}
