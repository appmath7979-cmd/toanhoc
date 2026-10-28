import { RadioGroup } from "radix-ui";
import { cn } from "@/libs/utils/cn";
import Label from "./Label";

interface RadioValueProps {
  id: string;
  value: string;
  label: string;
  description?: string;
}

interface RadioProps {
  defaultValue?: string;
  className?: string;
  direction?: "veritcal" | "horizontal";
  variant?: "default" | "box";
  values: RadioValueProps[];
  onValueChange: (val: string) => void;
}

function Radio({
  values,
  className,
  defaultValue,
  direction = "veritcal",
  // variant = "default",
  onValueChange,
}: RadioProps) {
  const flex = ["flex", direction === "veritcal" && "col"].join("-");
  return (
    <RadioGroup.Root
      defaultValue={defaultValue}
      className={cn(flex, className)}
    >
      {values.map((item) => (
        <Label key={item.id}>
          <RadioGroup.Item
            value={item.value}
            onChange={(e) => onValueChange(e.target.value)}
          >
            <RadioGroup.Indicator />
            <p>{item.label}</p>
          </RadioGroup.Item>
          <p>{item.description}</p>
        </Label>
      ))}
    </RadioGroup.Root>
  );
}

export { Radio, type RadioProps };
