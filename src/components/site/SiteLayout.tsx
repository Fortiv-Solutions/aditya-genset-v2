import { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { useLocation } from "react-router-dom";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isLoginPage && <Navbar />}
      <main className={isLoginPage ? "" : "pt-[88px]"}>{children}</main>
    </div>
  );
}
