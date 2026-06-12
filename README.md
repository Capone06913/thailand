# ThaiPass

Премиальный лендинг и SEO-экосистема для оформления виз в Таиланд (DTV, TR, пенсионная 50+).

## Структура

- `apps/web` — Next.js приложение (App Router)
- `teya-memory/` — статьи блога Excalibur, research, semantic core
- `docs/` — launch, версии, [публикация на GitHub](./docs/GITHUB.md)
- `memory-bank/` — контекст Memory Bank
- `research/semantic-core-runs/` — семантическое ядро (ЯДрышко)
- `auradesign/AURADESIGN.md` — дизайн-контракт
- `scripts/` — утилиты (clean-dashes, restore snapshots)

**Текущая версия:** `final-v3` (см. [docs/VERSIONS.md](./docs/VERSIONS.md))

## Быстрый старт

```bash
cd apps/web
cp ../../.env.example .env.local
# заполните TELEGRAM_BOT_TOKEN, TELEGRAM_LEAD_CHAT_ID, WORDPRESS_API_URL
npm install
npm run dev
```

Откройте http://localhost:3000

```bash
npm run build   # production-сборка
npm run lint
```

## GitHub

Первый push и секреты: **[docs/GITHUB.md](./docs/GITHUB.md)**

```powershell
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin master
git push origin --tags
```

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

## Услуги (slug → страница `/uslugi/...`)

| Slug | Название |
|------|----------|
| dtv-proverka | Проверка DTV |
| dtv-5-let-dokumenty | DTV под документы |
| dtv-5-let-garantiya | DTV под ключ |
| turisticheskaya-60-30 | TR 60+30 |
| turisticheskaya-srochnaya | TR срочная |
| turisticheskaya-6-mes | Мультивиза 6 мес. |
| pensionnaya-50 | Пенсионная 50+ |
| biznes-non-b | Non-B |
| perevod-dokumentov | Перевод документов |
