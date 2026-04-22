import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/BlurText";
import { FAQ_ITEMS } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="relative py-28 md:py-40 border-t border-[hsl(var(--border))]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-16">

          {/* Left — sticky heading */}
          <div className="md:sticky md:top-24 md:self-start">
            <span
              className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Questions fréquentes
            </span>
            <BlurText
              text="Questions fréquentes."
              as="h2"
              className="uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight mt-4"
              style={{ fontFamily: "var(--font-display)" }}
              delay={0.06}
            />
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-foreground/60 leading-relaxed max-w-[36ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Vous avez une question que vous ne trouvez pas ici ? Notre équipe répond sous 2h, tous les jours ouvrables.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Button variant="heroGlass" asChild>
                <a href="#cta">
                  Nous contacter
                  <ArrowUpRight className="ml-1 size-4" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger
                    className="uppercase text-lg md:text-xl tracking-tight py-6 text-foreground/90 data-[state=open]:text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-foreground/70 text-[15px] leading-relaxed max-w-[60ch]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}
