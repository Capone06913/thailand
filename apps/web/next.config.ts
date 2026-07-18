import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const staticAssetCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  trailingSlash: isGithubPages,
  ...(isGithubPages
    ? {
        basePath: "/thailand",
        assetPrefix: "/thailand/",
      }
    : {}),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    unoptimized: isGithubPages,
    formats: isGithubPages ? undefined : ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: staticAssetCache }],
            },
            {
              source: "/video/:path*",
              headers: [{ key: "Cache-Control", value: staticAssetCache }],
            },
            {
              source: "/_next/static/:path*",
              headers: [{ key: "Cache-Control", value: staticAssetCache }],
            },
          ];
        },
      }),
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
