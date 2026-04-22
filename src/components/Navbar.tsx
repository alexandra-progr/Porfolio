import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 z-50 w-[min(1200px,calc(100vw-32px))] -translate-x-1/2 transition-all duration-300",
          scrolled ? "top-2" : "top-4"
        )}
      >
        <div
          className={cn(
            "liquid-glass rounded-full px-2 py-2 flex items-center justify-between gap-4 transition-all duration-300",
            scrolled && "backdrop-blur-xl"
          )}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 pl-3 shrink-0">
            <img src="/logo.svg" className="h-6 w-auto" alt="Atelier" />
            <span
              className="font-display text-lg tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Atelier
            </span>
          </a>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Button variant="heroSolid" size="sm" asChild className="hidden sm:inline-flex">
              <a href="#cta">
                Devis gratuit
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden liquid-glass rounded-full w-9 h-9 flex items-center justify-center text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 liquid-glass-strong flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display uppercase text-3xl tracking-tight text-foreground/85 hover:text-foreground transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Button variant="hero" asChild className="mt-4">
              <a href="#cta" onClick={() => setMenuOpen(false)}>
                Devis gratuit
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
