import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { Slot } from "radix-ui";
import { ComponentProps } from "react";

interface SidebarMenuItem {
  setChild?: boolean;
}

export function SidebarMenuItem({
  setChild,
  children,
  ...props
}: SidebarMenuItem & ComponentProps<"button">) {
  const [isExpand, { setExpand }] = useAppStore(
    store.sidebar,
    (s) => s.isExpand,
  );

  const Comp = setChild ? Slot.Root : "button";

  const handleSelect = () => {
    if (isExpand) setExpand();
    else return;
  };

  return (
    <li>
      <Comp
        className={cn(
          "rounded-md transitions-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex justify-center items-center [&_svg]:size-4.5 font-medium text-sm hover:text-primary",
          (isExpand && "w-full h-8 flex justify-start gap-1.5 px-1") ||
          "[&_span]:hidden size-8",
        )}
        onClick={handleSelect}
        {...props}
      >
        {children}
      </Comp>
    </li>
  );
}
