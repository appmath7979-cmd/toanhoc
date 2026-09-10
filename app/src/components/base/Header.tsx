import { IconButton } from "../core/IconButton";
import { MenuIcon } from "lucide-react"

export function Header() {
  return (
    <header className="w-full py-4">
      <IconButton>
        <MenuIcon />
      </IconButton>
      <h1 className="uppercase font-semibold">Toán học</h1>
    </header>
  );
}
