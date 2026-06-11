# Контрольные версии ThaiPass

Точки отката для UI. Если дальнейшие правки что-то сломают — восстановите нужную версию.

## v1 — hero only (2026-06-10)

**Что сохранено:** только блок hero после кинематографичного скролла.

**Файл:** `apps/web/src/components/sections/scroll-video-hero.stable-2026-06-10.tsx`

**Восстановить hero v1:**

```powershell
Copy-Item "apps\web\src\components\sections\scroll-video-hero.stable-2026-06-10.tsx" "apps\web\src\components\sections\scroll-video-hero.tsx" -Force
```

## v2 — финальная главная (2026-06-10)

**Что сохранено:** полный UI главной после доработок (услуги, hero, лого, процесс, футер, шапка).

| Способ | Команда |
|--------|---------|
| Скрипт (копирует файлы в рабочую копию) | `.\scripts\restore-final-v2.ps1` |
| Git-тег (весь проект на момент v2) | `git checkout final-v2` |
| Git-ветка | `git checkout stable/final-v2` |
| Ручная копия | папка `snapshots/final-v2/` |

**Снимок файлов:** `snapshots/final-v2/`

**Тег git:** `final-v2`

---

## v3 — блог, копирайт, hero (2026-06-11)

**Что сохранено:** Excalibur-блог (18 статей), обложки Flux 2 Pro, очистка em-dash по сайту, hero-типографика, cookie/oferta/privacy, отзывы без подсказки Яндекс.

| Способ | Команда |
|--------|---------|
| Git-тег (весь проект на момент v3) | `git checkout final-v3` |
| Git-ветка | `git checkout stable/final-v3` |
| Версия npm-пакета web | `0.3.0` в `apps/web/package.json` |

**Тег git:** `final-v3`

**Коммит:** см. `git show final-v3`

---

После отката через git для продолжения работы: `git checkout master`
