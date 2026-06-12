# ThaiPass — чеклист запуска

## Перед продакшеном

1. Скопируйте `.env.example` → `apps/web/.env.local` и заполните:
   - `NEXT_PUBLIC_SITE_URL=https://thaipass.ru`
   - `TELEGRAM_BOT_TOKEN` + `TELEGRAM_LEAD_CHAT_ID` — уведомления о заявках
   - `NEXT_PUBLIC_WHATSAPP_URL` — реальный wa.me
   - `NEXT_PUBLIC_TELEGRAM_CHANNEL_URL` — канал с прайсом
   - `WORDPRESS_API_URL` + credentials — блог
   - `NEXT_PUBLIC_YM_COUNTER_ID` — Яндекс.Метрика
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics (опционально)

2. `cd apps/web && npm run build && npm start`

## Аналитика

- **Яндекс.Метрика:** создать счётчик, добавить ID в `.env`, проверить в браузере `ym(...)`
- **Google Analytics 4:** добавить `NEXT_PUBLIC_GA_MEASUREMENT_ID` (компонент в layout при необходимости)

## Поисковые системы

### Google Search Console
1. Добавить ресурс `https://thaipass.ru`
2. Подтвердить через DNS или HTML-файл
3. Отправить sitemap: `https://thaipass.ru/sitemap.xml`

### Яндекс.Вебмастер
1. Добавить сайт `https://thaipass.ru`
2. Подтвердить владение
3. Загрузить sitemap и проверить robots.txt

## WordPress блог

Статьи-черновики: `content/wordpress-drafts/`

Публикация через MCP-KV:
```
wordpress_content_blob_append → finalize → wordpress_create_post_from_blob
```

После публикации Next.js подтянет посты через `WORDPRESS_API_URL`.

## SEO аудит

Отчёт: `deliverables/seo-audit-localhost-2026-06-10.md` (87/100)

Повторить на проде:
```bash
node .agents/skills/indexlift-seo-auditor/scripts/run-audit.js \
  --url "https://thaipass.ru" --engines google,yandex \
  --output deliverables/
```

## Семантическое ядро

Папка: `research/semantic-core-runs/thaipass-2026-06-10/`

Перезапустить `/core` когда Wordstat MCP-KV настроен (регион 225).
