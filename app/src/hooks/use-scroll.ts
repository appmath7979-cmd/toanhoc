import { useEffect, useState } from "react";

export function useScroll() {
  const [currentY, setCurrentY] = useState<number | undefined>(() =>
    typeof window === "undefined" ? undefined : window.innerHeight,
  );

  useEffect(() => {
    if (currentY === undefined) return;
    const handleScroll = () => {
      setCurrentY(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentY]);

  return currentY;
}
