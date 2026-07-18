"use client";

import { PainSection } from "@/components/sections/pain-section";
import { FaqSection } from "@/components/sections/faq-section";
import { QuizSection } from "@/components/sections/quiz-section";
import { PackagesSection } from "@/components/sections/packages-section";
import { ProcessSection } from "@/components/sections/process-section";
import { DeliverySection } from "@/components/sections/delivery-section";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustSection } from "@/components/sections/trust-section";
import { LeadSection } from "@/components/sections/lead-section";
import { SectionDivider } from "@/components/ui/section-divider";

export function HomeBelowFold() {
  return (
    <>
      <PainSection />
      <SectionDivider />
      <FaqSection />
      <SectionDivider />
      <QuizSection />
      <SectionDivider />
      <PackagesSection />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <DeliverySection />
      <SectionDivider />
      <GuaranteesSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <TrustSection />
      <SectionDivider />
      <LeadSection />
    </>
  );
}
