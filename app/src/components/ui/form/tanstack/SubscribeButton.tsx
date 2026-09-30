import { useFormContext } from "@/context/form.context";
import { Button, ButtonProps } from "../../Button";


export default function SubscribeButton({ variant, children, setChild=false, ...props }: ButtonProps) {
  const form = useFormContext();

  return (
    <Button type="submit" variant={variant} setChild={setChild} {...props}>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {children}
      </form.Subscribe>
    </Button>
  )
}
