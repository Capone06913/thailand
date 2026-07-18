import dynamic from "next/dynamic";
import { MobileHeroStatic } from "@/components/sections/mobile-hero-static";
import { DesktopHeroStatic } from "@/components/sections/desktop-hero-static";
import { DesktopHeroLoader } from "@/components/sections/desktop-hero-loader";
import { SectionDivider } from "@/components/ui/section-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { landingFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

const PainSection = dynamic(() =>
  import("@/components/sections/pain-section").then((m) => m.PainSection),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FaqSection),
);
const QuizSection = dynamic(() =>
  import("@/components/sections/quiz-section").then((m) => m.QuizSection),
);
const PackagesSection = dynamic(() =>
  import("@/components/sections/packages-section").then((m) => m.PackagesSection),
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/process-section").then((m) => m.ProcessSection),
);
const DeliverySection = dynamic(() =>
  import("@/components/sections/delivery-section").then((m) => m.DeliverySection),
);
const GuaranteesSection = dynamic(() =>
  import("@/components/sections/guarantees-section").then(
    (m) => m.GuaranteesSection,
  ),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection,
  ),
);
const TrustSection = dynamic(() =>
  import("@/components/sections/trust-section").then((m) => m.TrustSection),
);
const LeadSection = dynamic(() =>
  import("@/components/sections/lead-section").then((m) => m.LeadSection),
);

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
      <MobileHeroStatic />
      <div
        id="desktop-hero-slot"
        className="relative hidden h-[240vh] md:block"
      >
        <DesktopHeroStatic />
        <DesktopHeroLoader />
      </div>
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
