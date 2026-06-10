# ThaiPass

Премиальный лендинг и SEO-экосистема для оформления виз в Таиланд (DTV, TR, пенсионная 50+).

## Структура

- `apps/web` — Next.js приложение
- `memory-bank/` — контекст Memory Bank
- `research/semantic-core-runs/` — семантическое ядро (ЯДрышко)
- `auradesign/AURADESIGN.md` — дизайн-контракт
- `.cursor/agents/` — core (ЯДрышко), aura-designer
- `.agents/skills/indexlift-seo-auditor/` — SEO аудит

## Быстрый старт

```bash
cd apps/web
cp ../../.env.example .env.local
# заполните TELEGRAM_BOT_TOKEN, TELEGRAM_LEAD_CHAT_ID, WORDPRESS_API_URL
npm run dev
```

Откройте http://localhost:3000

## Агенты

```
/core ThaiPass — визы в Таиланд
/van Initialize ThaiPass
/aura-designer обновить AURADESIGN.md
```

## SEO аудит

```bash
cd .agents/skills/indexlift-seo-auditor
npm install
node scripts/run-audit.js --url "http://localhost:3000" --engines google,yandex --output ../../../deliverables/
```

## Услуги

| Slug | Название |
|------|----------|
| dtv-audit | ThaiPass DTV Audit |
| dtv-concierge | ThaiPass DTV Concierge |
| tr-express | ThaiPass TR Express |
| tr-standard | ThaiPass TR Standard |
| retirement-50 | ThaiPass Retirement Path |
