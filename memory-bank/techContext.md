# Tech Context

## Monorepo layout

```
DTV_VISA_TH/
├── apps/web/          # Next.js 15 application
├── memory-bank/       # Memory Bank context
├── research/          # Semantic core runs (ЯДрышко)
├── auradesign/        # AURADESIGN.md + aura agent CLI
├── docs/              # ROADMAP, BRAND
├── scripts/yadryshko/ # Semantic core build scripts
└── .agents/skills/    # IndexLift SEO auditor
```

## apps/web stack

- Next.js 15 App Router
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion + React Bits + Magic UI (design phase)
- Zod + react-hook-form for LeadForm
- WordPress REST API client in `lib/wordpress.ts`

## APIs

- `POST /api/lead` — validates form, sends Telegram message via Bot API
- Blog: `GET` from `WORDPRESS_API_URL` env

## SEO

- `generateMetadata` per route
- JSON-LD: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList
- `app/sitemap.ts`, `app/robots.ts`

## Agents

- `/core` — ЯДрышко semantic core
- `/van`, `/plan`, `/build` — Memory Bank workflow
- Aura Designer — `auradesign/AURADESIGN.md`
- IndexLift — `node .agents/skills/indexlift-seo-auditor/scripts/run-audit.js`
