import { ScrollVideoHero } from "@/components/sections/scroll-video-hero";
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
import { JsonLd } from "@/components/seo/json-ld";
import { landingFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.officeCity,
    addressCountry: "RU",
    ...(siteConfig.officeAddress
      ? { streetAddress: siteConfig.officeAddress }
      : {}),
  },
  areaServed: "Russia",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqSchema, localBusinessSchema]} />
      <ScrollVideoHero />
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

