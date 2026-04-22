import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/BlurText";
import { FOOTER_LINKS } from "@/lib/data";

const CTA_BG_VIDEO = ""; // [TODO: Set your CTA background video URL (MP4 or HLS .m3u8)]

export function CtaFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!CTA_BG_VIDEO || !videoRef.current) return;
    videoRef.current.src = CTA_BG_VIDEO;
  }, []);

  return (
    <section
      id="cta"
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      {CTA_BG_VIDEO && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
      )}

      {/* Gradient background fallback */}
      {!CTA_BG_VIDEO && (
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(14_40%_10%)] via-[hsl(20_20%_7%)] to-[hsl(20_15%_4%)]" />
      )}

      {/* Top/bottom fades */}
      <div className="absolute top-0 inset-x-0 h-[200px] z-[1] gradient-fade-t" />
      <div className="absolute bottom-0 inset-x-0 h-[200px] z-[1] gradient-fade-b pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-[var(--gutter)] py-24 flex-1 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Commençons
          </span>
        </motion.div>

        <BlurText
          text="Prêts à partir ?"
          as="h2"
          className="italic text-[clamp(52px,10vw,180px)] leading-[0.88] tracking-[-0.02em] max-w-[16ch]"
          style={{ fontFamily: "var(--font-display)" }}
          delay={0.08}
          startDelay={0.1}
        />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-base md:text-lg text-foreground/75 max-w-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Un entretien. Un plan. Un déménagement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center gap-3 flex-wrap justify-center"
        >
          <Button variant="hero">
            Devis gratuit
            <ArrowUpRight className="ml-1 size-4" />
          </Button>
          <Button variant="heroGlass">
            Nos tarifs
          </Button>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 w-full border-t border-[hsl(var(--border))] mt-auto">
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-xs text-foreground/45"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © 2026 Atelier SA. Tous droits réservés.
          </span>
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-foreground/45 hover:text-foreground/75 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
