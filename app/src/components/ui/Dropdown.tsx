import { DropdownMenu } from "radix-ui";
import type { ReactNode } from "react";

function Dropdown({ children }: { children: ReactNode }) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

function DropdownTrigger({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu.Trigger disabled={disabled} className="btn btn-ghost">
      {children}
    </DropdownMenu.Trigger>
  );
}

function DropdownContent({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="min-w-40 flex flex-col rounded-md border border-border shadow-sm">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

function DropdownItem({
  children,
  ...props
}: DropdownMenu.DropdownMenuItemProps) {
  return (
    <DropdownMenu.Item
      className="btn btn-ghost btn-sm cursor-default"
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}

function DropdownSeparator() {
  return <DropdownMenu.Separator />;
}

function DropdownLabel({ children }: { children: ReactNode }) {
  return <DropdownMenu.Label>{children}</DropdownMenu.Label>;
}

function DropdownSub({ children }: { children: ReactNode }) {
  return <DropdownMenu.Sub>{children}</DropdownMenu.Sub>;
}

function DropdownSubTrigger({ children }: { children: ReactNode }) {
  return <DropdownMenu.SubTrigger>{children}</DropdownMenu.SubTrigger>;
}

function DropdownSubContent({ children }: { children: ReactNode }) {
  return <DropdownMenu.SubContent>{children}</DropdownMenu.SubContent>;
}

export {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
};
