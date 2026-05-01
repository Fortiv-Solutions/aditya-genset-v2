import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut } from "lucide-react";
import logo from "@/assets/brand/aditya-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/products/silent-62-5", label: "Showcase" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onDark = pathname === "/" || pathname === "/welcome";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { 
    setOpen(false); 
    setProfileOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (profileOpen && !target.closest('.profile-dropdown')) {
        setProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const solid = scrolled || !onDark || open;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-50 transition-all duration-500 ease-brand px-4 sm:px-8 flex justify-center pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-full max-w-5xl rounded-full transition-all duration-500 ease-brand pointer-events-auto",
          solid
            ? "bg-white/95 backdrop-blur shadow-[0_8px_30px_-12px_rgba(11,58,92,0.3)] border border-white/20"
            : "bg-white/5 backdrop-blur-md border border-white/10"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Aditya"
              className={cn("h-8 w-auto transition-all duration-500 ease-brand group-hover:scale-105", !solid && onDark ? "brightness-0 invert" : "")}
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-105 active:scale-95",
                    solid ? "text-foreground/80" : "text-white/80 hover:text-white",
                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-brand hover:after:scale-x-100",
                    isActive && (solid ? "text-foreground after:scale-x-100" : "text-white after:scale-x-100"),
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            
            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-105 active:scale-95",
                  solid ? "text-foreground/80" : "text-white/80 hover:text-white"
                )}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg border border-border/20 overflow-hidden animate-fade-in-soft">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={cn("md:hidden transition-colors", solid ? "text-foreground" : "text-white")}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/10 bg-white/95 backdrop-blur rounded-b-3xl animate-fade-in-soft overflow-hidden">
            <div className="flex flex-col py-4 px-6">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn("py-3 text-sm font-medium border-b border-border/5 last:border-0 text-foreground/80", isActive && "text-accent font-bold")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              
              {/* Mobile Profile with Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-3 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
