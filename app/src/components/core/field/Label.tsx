import { ComponentProps } from "react";


export function Label({ children, ...props }: ComponentProps<"label">) {
  return (
    <label {...props} className="font-medium text-sm">{children}</label>
  )
}
