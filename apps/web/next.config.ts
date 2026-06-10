import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/uslugi/dtv-audit",
        destination: "/uslugi/dtv-proverka",
        permanent: true,
      },
      {
        source: "/uslugi/dtv-concierge",
        destination: "/uslugi/dtv-5-let-garantiya",
        permanent: true,
      },
      {
        source: "/uslugi/tr-standard",
        destination: "/uslugi/turisticheskaya-60-30",
        permanent: true,
      },
      {
        source: "/uslugi/tr-express",
        destination: "/uslugi/turisticheskaya-srochnaya",
        permanent: true,
      },
      {
        source: "/uslugi/retirement-50",
        destination: "/uslugi/pensionnaya-50",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
