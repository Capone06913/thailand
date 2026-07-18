import { MobileHeroStatic } from "@/components/sections/mobile-hero-static";
import { DesktopHeroStatic } from "@/components/sections/desktop-hero-static";
import { DesktopHeroLoader } from "@/components/sections/desktop-hero-loader";
import { HomeBelowFoldLoader } from "@/components/sections/home-below-fold-loader";
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
      <MobileHeroStatic />
      <div
        id="desktop-hero-slot"
        className="relative hidden h-[240vh] md:block"
      >
        <DesktopHeroStatic />
        <DesktopHeroLoader />
      </div>
      <HomeBelowFoldLoader />
    </>
  );
}
