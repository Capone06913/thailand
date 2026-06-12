# ThaiPass — Roadmap

## S0 Setup (Day 1–2) — DONE

- [x] Memory Bank, ЯДрышко, IndexLift, Aura Designer installed
- [x] `.cursor/rules/thaipass.mdc`
- [x] `memory-bank/` initialized
- [x] `.env.example`, `docs/BRAND.md`
- [x] Semantic core run in `research/semantic-core-runs/`

## S1 Scaffold (Day 3–5)

- [x] Next.js 15 in `apps/web`
- [x] Routes: `/`, `/uslugi/*`, `/blog`, `/kontakty`
- [x] `POST /api/lead` → Telegram
- [x] WordPress fetch + mock fallback

## S2 Content (Day 6–8)

- [x] Landing 70/20/10
- [x] 5 service pages with unique SEO
- [x] FAQ + JSON-LD Schema

## S3 Motion (Day 9–12)

- [x] `auradesign/AURADESIGN.md`
- [x] React Bits + Magic UI components

## S4 SEO QA (Day 13–14)

- [ ] IndexLift audit on production URL
- [ ] 2–3 blog articles in WordPress (when host ready)
- [x] sitemap.ts, robots.ts
- [ ] Yandex Metrika + GSC / Вебмастер (after deploy)

## S5 Launch (Day 15+)

- [ ] Domain `thaipass.ru` DNS
- [ ] SSL, production env
- [ ] Paid traffic: Yandex Direct + Google Ads on DTV/TR long-tail

## Page map

| URL | Type |
|-----|------|
| `/` | Landing |
| `/uslugi/dtv-audit` | Service |
| `/uslugi/dtv-concierge` | Service |
| `/uslugi/tr-express` | Service |
| `/uslugi/tr-standard` | Service |
| `/uslugi/retirement-50` | Service |
| `/blog` | Blog index |
| `/blog/[slug]` | Article |
| `/kontakty` | Contacts + office |

## Agent commands

```
/core ThaiPass — визы в Таиланд
/van Initialize ThaiPass landing
/aura-designer Create AURADESIGN.md for ThaiPass premium relocation brand
```

IndexLift audit:
```bash
cd .agents/skills/indexlift-seo-auditor && npm install
node scripts/run-audit.js --url "http://localhost:3000" --engines google,yandex --output ./deliverables/
```
