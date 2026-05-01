import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function RouteFade({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [stage, setStage] = useState<"in" | "out">("in");
  const [shown, setShown] = useState(children);

  useEffect(() => {
    setStage("out");
    const t = setTimeout(() => {
      setShown(children);
      setStage("in");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 180);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // keep children in sync while in
  useEffect(() => { if (stage === "in") setShown(children); }, [children, stage]);

  return (
    <div className={cn("transition-opacity duration-300 ease-brand", stage === "in" ? "opacity-100" : "opacity-0")}>
      {shown}
    </div>
  );
}
