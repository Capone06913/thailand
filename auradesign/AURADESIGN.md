# AURADESIGN v2 — ThaiPass (июнь 2026)

Премиальный visa concierge. Референсы: `ref/` (5 PNG). Не копируем tour-пакеты, ₹-цены, слоган «land of Smile».

## Палитра

| Token | Hex | Роль |
|-------|-----|------|
| `--color-teal` | `#0a4a48` | Primary, CTA hover |
| `--color-sapphire` | `#142a45` | Тёмные блоки, ticker, hero overlay |
| `--color-gold` | `#d4a853` | Акценты, badges, кнопки на тёмном |
| `--color-sky` | `#4a9fd4` | Ссылки, вторичный акцент |
| `--color-bg` | `#f8f6f1` | Фон страницы |
| `--color-surface` | `#efece4` | Карточки, секции |

## Типографика

- **Display / H1:** Unbounded (`--font-display`) — uppercase, tight tracking, кириллица
- **Body:** Manrope (`--font-sans`)
- **H2 опционально:** Fraunces или Outfit semibold без uppercase

## Hero (ScrollVideoHero) — единственный hero на главной

- MP4: `public/video/hero-loop.mp4` (яркий Phuket/coast, scrub по скроллу)
- Poster: `public/images/generated/hero-poster.jpg` (Nano Banana)
- 200vh scroll zone, sticky full-viewport video (≥70% viewport видно)
- H1 text-reveal via `clip-path` на 0–35% scroll
- **Один** compact lead widget (правый нижний угол), не две opaque панели
- Ribbon: `0 ₽ · до 30 мин · DTV·TR` без nested boxes
- Cursor spotlight **только на video layer**, не под текстом
- Overlay scrim ≤35% opacity at top
- `CinematicHero` — deprecated, не использовать на главной
- `prefers-reduced-motion`: статичный poster

## Trust ticker (InteractiveMarquee)

- Тёмная полоса (`--color-sapphire`), gold border chips
- Автоскролл + pause on pointer down + drag both directions
- Кликабельные чипы: `#uslugi`, `#dostavka`, Telegram, thaievisa.go.th

## Карточки услуг

- Full-bleed фото (Phuket ref): gradient overlay, badge со сроком
- Hover: лёгкий scale + shadow depth
- Русские названия из Wordstat (без Audit/Concierge/Retirement Path в UI)

## Lead form

- Glass card + gold ring + `lead-card-bg` (Nano 4:5)
- Поля: имя, контакт, услуга; deadline/comment — collapsible
- Success: teal check + CTA Telegram

## Motion

- Framer Motion: scroll-linked hero, section `whileInView`
- Без marquee CSS-only — только InteractiveMarquee (RAF)
- Reduced motion respected everywhere

## Запреты

- Нет месяца/года в badge свежести
- Нет длинных тире (—) в маркетинговых текстах
- Нет телефона на сайте (только WA/TG)
- Не 21st/Magic UI как основа визуала
- **BorderBeam / вращающийся conic-gradient квадрат** — запрещён на UI
- Непрозрачные белые панели >40% opacity поверх hero video
- Одинаковый `whileHover scale/lift` на каждой карточке
- CTA «Уточнить доставку» в секции географии
