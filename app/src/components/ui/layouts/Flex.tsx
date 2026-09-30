import { cn } from "@/libs/utils/cn"
import { ReactNode } from "react"

const directions = {
  "horizontal": "",
  "horizontal-reverse": "",
  "vertical": "",
  "vertical-reverse": "",
}

interface FlexProps {
  direction?: keyof typeof directions
  className?: string
  children: ReactNode
}

export default function Flex({ direction = "horizontal", className, children }: FlexProps) {
  return (
    <div className={cn("flex", directions[direction], className)}>{children}</div>
  )
}
