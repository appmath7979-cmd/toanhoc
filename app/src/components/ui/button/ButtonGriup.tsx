import type { ReactNode } from "react";

export default function ButtonGroup({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-0 [&_button]:rounded-none! rounded-md overflow-hidden border border-border">
      {children}
    </div>
  );
}
