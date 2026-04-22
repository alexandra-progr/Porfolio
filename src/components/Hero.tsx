import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/BlurText";
import { ScrubSequence } from "@/components/ScrubSequence";
import { FRAMES_PATH, FRAME_COUNT, FRAME_EXT } from "@/lib/constants";
import { PARTNERS } from "@/lib/data";

type HeroProps = {
  scrollRef: React.RefObject<HTMLElement | null>;
};

export function Hero({ scrollRef }: HeroProps) {
  return (
    <section
      ref={scrollRef as React.RefObject<HTMLElement>}
      className="relative h-[250vh] bg-background"
      id="hero"
    >
      {/* Visually-hidden description for accessibility */}
      <p className="sr-only">
        Atelier — Déménagement d'exception. Du studio au penthouse, l'art du déménagement.
      </p>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-scrubbed frame sequence */}
        <ScrubSequence
          framesPath={FRAMES_PATH}
          frameCount={FRAME_COUNT}
          ext={FRAME_EXT}
          scrollTargetRef={scrollRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Fallback gradient when no frames are loaded */}
        <div className="absolute inset-0 z-[0] bg-gradient-to-br from-[hsl(20_15%_12%)] to-[hsl(14_30%_7%)]" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_50%_60%,transparent_40%,rgba(0,0,0,0.60)_100%)]" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 inset-x-0 h-[40vh] z-[2] gradient-fade-b" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">

          {/* Tagline pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="liquid-glass rounded-full px-1 py-1 inline-flex items-center gap-2">
              <span className="bg-foreground text-background rounded-full px-3 py-1 text-xs font-semibold">
                Nouveau
              </span>
              <span className="pr-3 text-sm text-foreground/85" style={{ fontFamily: "var(--font-body)" }}>
                Déménagement d'exception
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <BlurText
            text="Bouger, sans bruit."
            as="h1"
            className="mt-6 uppercase text-[clamp(52px,9vw,144px)] leading-[0.92] tracking-[-0.02em] text-foreground max-w-[14ch]"
            style={{ fontFamily: "var(--font-display)" } as React.CSSProperties}
            delay={0.09}
            startDelay={0.15}
          />

          {/* Sub-headline */}
          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Du studio au penthouse. L'art du déménagement, signé Atelier.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-3 flex-wrap justify-center"
          >
            <Button variant="hero" asChild>
              <a href="#cta">
                Devis gratuit
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button variant="heroGlass">
              <Play className="mr-1.5 size-4 fill-current" />
              Voir le film
            </Button>
          </motion.div>

          {/* Partners row — pinned to bottom */}
          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4 px-6">
            <span
              className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Ils nous font confiance
            </span>
            <div className="flex items-center gap-8 md:gap-14 flex-wrap justify-center">
              {PARTNERS.map((p) => (
                <span
                  key={p}
                  className="italic text-xl md:text-2xl text-foreground/65 tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
