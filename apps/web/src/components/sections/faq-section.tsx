"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { landingFaq } from "@/lib/faq";

export function FaqSection() {
  return (
    <section id="faq" className="section-flow bg-white px-4 pb-28 md:pb-36 md:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Частые вопросы
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--color-sapphire)] md:text-5xl">
            Вопросы, которые решают сомнения
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)]">
            Развёрнутые ответы про DTV, туристическую визу, пенсионную визу и
            оформление из Москвы — то, что мешает принять решение.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
          >
            {landingFaq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 px-5 shadow-sm transition-shadow data-[state=open]:border-[var(--color-teal)]/30 data-[state=open]:bg-white data-[state=open]:shadow-lg"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-[var(--color-sapphire)] hover:no-underline md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm font-medium leading-relaxed text-[var(--color-muted)] md:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
