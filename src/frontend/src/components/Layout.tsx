import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CloudRain,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Star,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Articles", href: "#articles" },
  { label: "Photography", href: "#photography" },
  { label: "Sounds", href: "#sounds" },
  { label: "Resources", href: "#resources" },
];

export function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    isAuthenticated,
    login,
    clear,
    isLoggingIn,
    isInitializing,
    identity,
  } = useInternetIdentity();

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Shorten principal for display
  const principalStr = identity?.getPrincipal().toText() ?? "";
  const shortPrincipal = principalStr
    ? `${principalStr.slice(0, 5)}…${principalStr.slice(-3)}`
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="/#"
            className="flex items-center gap-2 shrink-0 transition-smooth hover:opacity-80"
            data-ocid="nav.brand_link"
          >
            <span className="text-accent">
              <CloudRain className="w-6 h-6" />
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Rainy Day Hub
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted"
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Auth button */}
            {!isInitializing &&
              (isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-body text-accent"
                    data-ocid="nav.user_identity"
                    title={principalStr}
                  >
                    <Star className="w-3 h-3 fill-accent" />
                    <span>{shortPrincipal}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    aria-label="Log out"
                    data-ocid="nav.logout_button"
                    className="text-muted-foreground hover:text-foreground text-xs gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Log out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  aria-label="Save your favorites — log in"
                  data-ocid="nav.login_button"
                  className="hidden sm:flex items-center gap-1.5 text-xs border-accent/30 text-accent hover:bg-accent/10"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Save your favorites
                </Button>
              ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              data-ocid="nav.theme_toggle"
              className="text-muted-foreground hover:text-foreground"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1 fade-in">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="w-full text-left px-3 py-2.5 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile auth */}
            {!isInitializing && (
              <div className="pt-1 border-t border-border mt-1">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span
                      className="text-xs text-accent font-body flex items-center gap-1.5"
                      data-ocid="nav.mobile_user_identity"
                    >
                      <Star className="w-3 h-3 fill-accent" />
                      {shortPrincipal}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        clear();
                        setMenuOpen(false);
                      }}
                      data-ocid="nav.mobile_logout_button"
                      className="text-xs text-muted-foreground hover:text-foreground gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    data-ocid="nav.mobile_login_button"
                    className="w-full text-left px-3 py-2.5 text-sm font-body text-accent hover:bg-accent/10 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Save your favorites — Log in
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-accent" />
            <span className="font-display font-semibold text-foreground">
              Rainy Day Hub
            </span>
          </div>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
