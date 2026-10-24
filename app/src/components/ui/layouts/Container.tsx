import type { ReactNode } from "react";

interface ContainerProps {
  as?: "div" | "main";
  children: ReactNode;
}
export default function Container({ as = "main", children }: ContainerProps) {
  const Comp = as;
  return (
    <Comp className="w-full overflow-y-auto h-[calc(100dvh-34px)] custom-scrollbar">
      {children}
    </Comp>
  );
}
