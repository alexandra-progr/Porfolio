import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { STATS } from "@/lib/data";

const STATS_BG_VIDEO = ""; // [TODO: Set your Stats background video URL (MP4 or HLS .m3u8)]
const STATS_BG_IMAGE = "/court.jpg";

type StatItemProps = { value: string; label: string; inView: boolean };

function StatItem({ value, label, inView }: StatItemProps) {
  const numMatch = value.match(/^(\d[\d.]*)/);
  const numericTarget = numMatch ? parseFloat(numMatch[1]) : null;
  const suffix = numMatch ? value.slice(numMatch[0].length) : "";

  const [displayed, setDisplayed] = useState(numericTarget !== null ? "0" + suffix : value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || numericTarget === null) return;

    const startTime = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericTarget);
      setDisplayed(current + suffix);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, numericTarget, suffix]);

  return (
    <div className="flex flex-col gap-3 relative">
      <span
        className="italic text-5xl md:text-6xl lg:text-7xl leading-none text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {displayed}
      </span>
      <span
        className="text-sm text-foreground/60 tracking-wide uppercase"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(gridRef as React.RefObject<HTMLElement>, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!STATS_BG_VIDEO || !videoRef.current) return;
    videoRef.current.src = STATS_BG_VIDEO;
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">

      {/* Video background */}
      {STATS_BG_VIDEO && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover saturate-0 opacity-60"
        />
      )}

      {/* Photo background */}
      {!STATS_BG_VIDEO && STATS_BG_IMAGE && (
        <img
          src={STATS_BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center saturate-0 opacity-45"
        />
      )}

      {/* Dark base (shows through desaturated photo) */}
      {!STATS_BG_VIDEO && (
        <div className="absolute inset-0 bg-[hsl(20_15%_5%)]" style={{ zIndex: -1 }} />
      )}

      {/* Top/bottom fades */}
      <div className="absolute top-0 inset-x-0 h-[200px] z-[1] gradient-fade-t" />
      <div className="absolute bottom-0 inset-x-0 h-[200px] z-[1] gradient-fade-b" />

      {/* Stats card */}
      <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="liquid-glass rounded-3xl p-10 md:p-14">

          <div className="mb-10 md:mb-14">
            <span
              className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nos chiffres
            </span>
            <BlurText
              text="Des résultats qui parlent d'eux-mêmes."
              as="h2"
              className="uppercase text-3xl md:text-5xl leading-[0.9] tracking-tight max-w-[22ch]"
              style={{ fontFamily: "var(--font-display)" }}
              delay={0.06}
            />
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {STATS.map((stat, idx) => (
              <div key={stat.label} className="relative">
                {/* Vertical separator for desktop */}
                {idx > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-14 -translate-x-3 bg-gradient-to-b from-transparent via-[hsl(var(--border))] to-transparent" />
                )}
                <StatItem value={stat.value} label={stat.label} inView={inView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
