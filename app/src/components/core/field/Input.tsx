import { ComponentProps } from "react";

export function Input({ ...props }: ComponentProps<"input">) {
  return (
    <input {...props} className="border-2 border-border outline-2 outline-transparent ring-transparent ring-1 rounded-md px-2 py-1.5 focus:ring-border focus:outline-border transition-all duration-300 text-sm shadow-sm" />
  )
}
