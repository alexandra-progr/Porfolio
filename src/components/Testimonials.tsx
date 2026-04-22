import { Quote } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { TESTIMONIALS } from "@/lib/data";

type Testimonial = { quote: string; name: string; role: string };

function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <div className="liquid-glass rounded-2xl p-7 w-[340px] md:w-[400px] shrink-0 flex flex-col gap-5">
      <Quote className="size-5 text-primary/70" />
      <p
        className="text-foreground/85 italic leading-relaxed text-[15px] flex-1"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {quote}
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="size-9 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span
            className="font-medium text-sm text-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {name}
          </span>
          <span
            className="text-xs text-foreground/55 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [
    ...TESTIMONIALS.slice(3),
    ...TESTIMONIALS.slice(0, 3),
    ...TESTIMONIALS.slice(3),
    ...TESTIMONIALS.slice(0, 3),
  ];

  return (
    <section id="testimonials" className="relative py-28 md:py-40">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-16 md:mb-20">
        <span
          className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Témoignages
        </span>
        <BlurText
          text="Ils parlent mieux que nous."
          as="h2"
          className="uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "var(--font-display)" }}
          delay={0.06}
        />
      </div>

      {/* Marquee rows */}
      <div className="group relative flex flex-col gap-5 overflow-hidden marquee-mask">
        {/* Row 1 — forward */}
        <div
          className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationName: "marquee", animationDuration: "28s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}
        >
          {row1.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Row 2 — reverse */}
        <div
          className="flex gap-5 w-max group-hover:[animation-play-state:paused]"
          style={{ animationName: "marquee-rev", animationDuration: "32s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}
        >
          {row2.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
