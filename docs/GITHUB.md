# Публикация ThaiPass на GitHub

Репозиторий готов к первому push: секреты в `.gitignore`, `.env.example` в корне, CI проверяет lint и build.

## 1. Создайте репозиторий

На [github.com/new](https://github.com/new):

- **Name:** например `thaipass` или `DTV_VISA_TH`
- **Visibility:** Private (рекомендуется: заявки, Telegram, WordPress credentials)
- **Не** добавляйте README, `.gitignore` и license — они уже в проекте

## 2. Авторизация (один раз)

```powershell
gh auth login
```

Или используйте SSH / Personal Access Token.

## 3. Привязка remote и push

Замените `YOUR_USER` и `YOUR_REPO` на свои значения.

```powershell
cd C:\Users\sasha\Desktop\DTV_VISA_TH

git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
# SSH: git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git

git push -u origin master
git push origin --tags
git push origin stable/final-v3
```

Теги для отката: `final-v2`, `final-v3`.

## 4. Переменные окружения

Локально:

```powershell
cd apps\web
copy ..\..\.env.example .env.local
# заполните TELEGRAM_BOT_TOKEN, TELEGRAM_LEAD_CHAT_ID и при необходимости WORDPRESS_*
```

Для деплоя (Vercel, VPS и т.д.) задайте те же ключи в панели хостинга или в **GitHub → Settings → Secrets and variables → Actions** (если деплой через Actions).

| Переменная | Назначение |
|------------|------------|
| `TELEGRAM_BOT_TOKEN` | Bot API для заявок |
| `TELEGRAM_LEAD_CHAT_ID` | Чат/канал для лидов |
| `WORDPRESS_API_URL` | REST API блога (пусто = Excalibur mock) |
| `NEXT_PUBLIC_TELEGRAM_BOT_URL` | Бот/менеджер для кнопок «узнать цену» на `/uslugi/*` |
| `NEXT_PUBLIC_SITE_URL` | Канонический URL продакшена |
| `NEXT_PUBLIC_YM_COUNTER_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Аналитика (опционально) |

## 5. CI

Workflow `.github/workflows/ci.yml` на push/PR в `master`:

- `npm ci` + `npm run lint` + `npm run build` в `apps/web`

## 6. Версии и откат

См. [docs/VERSIONS.md](./VERSIONS.md).

```powershell
git checkout final-v3          # весь проект на v3
git checkout master            # вернуться к разработке
```

## 7. Что не коммитить

- `.env`, `.env.local`, `apps/web/.env.local`
- `node_modules/`, `.next/`
- `deliverables/` (артефакты аудитов)

Проверка перед push:

```powershell
git status
git ls-files | Select-String "\.env"
```

Должен быть только `.env.example`.
