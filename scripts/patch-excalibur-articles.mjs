import fs from "fs";
import path from "path";

const articlesDir = path.join(
  process.cwd(),
  "teya-memory/blog/articles",
);

const titleUpdates = {
  B01: {
    title: "DTV виза в Таиланд: полный гайд для россиян",
    meta_description:
      "Destination Thailand Visa: кому подходит DTV, 500 000 бат, Workcation и Soft Power, подача через thaievisa.go.th. Без гарантий — только факты.",
  },
  B02: {
    title: "TDAC Таиланд: как заполнить цифровую карту прибытия",
    meta_description:
      "Пошаговая инструкция TDAC на tdac.immigration.go.th: окно 72 часа, поля, типичные ошибки. Не путать с визой.",
  },
  B03: {
    title: "Безвиз в Таиланд для россиян: сроки и когда нужна виза",
    meta_description:
      "Безвизовый въезд в Таиланд: сроки, TDAC, когда оформлять DTV или туристическую TR.",
  },
  B04: {
    title: "Workcation DTV: документы для удалёнщика и фрилансера",
    meta_description:
      "Чек-лист документов DTV Workcation: договор, выписка, портфолио, страховка для россиян.",
  },
  B05: {
    title: "500 000 бат для DTV: как оформить выписку без отказа",
    meta_description:
      "Сколько нужно на счёте для DTV, валюта, формат выписки для thaievisa.go.th.",
  },
  B06: {
    title: "Thaievisa.go.th: пошаговая подача визы в Таиланд",
    meta_description:
      "Регистрация, анкета, документы, оплата и статусы на thaievisa.go.th для DTV и TR.",
  },
  B07: {
    title: "Отказ DTV: типичные причины и что делать",
    meta_description:
      "Почему отклоняют DTV: выписка, категория, документы. Как исправить пакет перед повторной подачей.",
  },
  B08: {
    title: "DTV Soft Power Muay Thai: документы и подача",
    meta_description:
      "DTV через обучение Muay Thai: договор со школой, 500 000 бат, thaievisa.go.th.",
  },
  B09: {
    title: "Туристическая виза TR: полный список документов",
    meta_description:
      "Чек-лист документов туристической TR: паспорт, брони, финансы, страховка.",
  },
  B10: {
    title: "Срочная туристическая TR: реальные сроки оформления",
    meta_description:
      "Срочная TR без мифа «за 3 дня»: документы, TR Express, план B.",
  },
  B11: {
    title: "Пенсионная виза Таиланд 50+: требования для россиян",
    meta_description:
      "Non-Immigrant O-A: возраст, депозит или пенсия, страховка, подача через thaievisa.",
  },
  B12: {
    title: "TDAC: 10 частых ошибок при заполнении",
    meta_description:
      "Типичные ошибки TDAC: раннее заполнение, паспорт, рейс, путаница с визой.",
  },
  B13: {
    title: "Удалёнщик в Таиланде: безвиз или DTV — что выбрать",
    meta_description:
      "Сравнение безвиза, TR и DTV Workcation: сроки, 500k бат, риски для удалёнщиков.",
  },
  B14: {
    title: "Продление пребывания в Таиланде: виза, штамп и IMMI",
    meta_description:
      "Как продлить безвиз, TR, DTV и O-A: TM.7, overstay, re-entry permit.",
  },
  B15: {
    title: "Посольство Таиланда в Москве: как подать на визу",
    meta_description:
      "Royal Thai Embassy Moscow и thaievisa.go.th: VAC, биометрия, маршрут подачи.",
  },
};

function fixMarkdownBold(html) {
  return html.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
}

function removeFreshnessLine(html) {
  return html
    .replace(/<p><i>Актуально на [^<]+<\/i><\/p>\s*/gi, "")
    .replace(/Актуально на (июнь )?2026\.?\s*/gi, "")
    .replace(/\s*2026 для россиян/g, " для россиян")
    .replace(/в 2026(?=[\s.:,—])/gi, "")
    .replace(/ 2026(?=[\s.:,—])/g, "")
    .replace(/Таиланд 2026/g, "Таиланд")
    .replace(/TDAC 2026/g, "TDAC")
    .replace(/безвиз Таиланд 2026/g, "безвиз в Таиланд")
    .replace(/форумам 2024 года/g, "устаревшим форумам");
}

function dedupeLeadCta(html) {
  const zayavkaRe =
    /<a href="https:\/\/thaipass\.ru\/#zayavka"[^>]*>[^<]*<\/a>/gi;
  const matches = [...html.matchAll(zayavkaRe)];
  if (matches.length <= 1) return html;

  let kept = false;
  return html.replace(zayavkaRe, (match) => {
    if (!kept) {
      kept = true;
      return match;
    }
    return "";
  }).replace(/\s{2,}/g, " ")
    .replace(/(<p>[^<]*)\s+([,.—])/g, "$1$2")
    .replace(/<p>\s*([,.—])/g, "<p>")
    .replace(/\s+<\/p>/g, "</p>")
    .replace(/<p>\s*<\/p>/g, "");
}

function unifyWhatNextCta(html) {
  const marker = "<h2>Что дальше</h2>";
  const idx = html.indexOf(marker);
  if (idx === -1) return html;

  const before = html.slice(0, idx);
  const after = html.slice(idx);
  const cleanedBefore = before.replace(
    /<a href="https:\/\/thaipass\.ru\/#zayavka"[^>]*>[^<]*<\/a>/gi,
    "",
  );

  const unifiedAfter = after.replace(
    /<ol>[\s\S]*?<\/ol>/,
    `<ol>
<li>Определите тип визы под вашу цель пребывания.</li>
<li>Сверьте чек-лист на thaievisa.go.th и moscow.thaiembassy.org.</li>
<li>Соберите документы и проверьте даты в анкете и билетах.</li>
<li>Заполните TDAC перед каждым въездом — отдельно от визы.</li>
<li><a href="https://thaipass.ru/#zayavka">Получить бесплатный разбор кейса</a> — подскажем пакет ThaiPass под вашу ситуацию.</li>
</ol>`,
  );

  return cleanedBefore + unifiedAfter;
}

function removeDuplicateAuditZayavka(html) {
  return html.replace(
    /<p>([^<]*<a href="https:\/\/thaipass\.ru\/uslugi\/[^"]+"[^>]*>[^<]*<\/a>[^<]*)<a href="https:\/\/thaipass\.ru\/#zayavka"[^>]*>[^<]*<\/a>([^<]*)<\/p>/gi,
    "<p>$1$2</p>",
  );
}

function patchMeta(metaPath, topicId) {
  if (!fs.existsSync(metaPath)) return;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const upd = titleUpdates[topicId];
  if (!upd) return;
  meta.title = upd.title;
  meta.meta_description = upd.meta_description;
  if (meta.meta_ab) {
    for (const key of Object.keys(meta.meta_ab)) {
      if (typeof meta.meta_ab[key] === "string") {
        meta.meta_ab[key] = meta.meta_ab[key]
          .replace(/ 2026/g, "")
          .replace(/2026/g, "")
          .replace(/Актуально на июнь 2026\.?\s*/gi, "")
          .trim();
      }
    }
  }
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
}

const folders = fs
  .readdirSync(articlesDir)
  .filter((f) => /^B\d+-/.test(f));

for (const folder of folders) {
  const htmlPath = path.join(articlesDir, folder, "article.html");
  const metaPath = path.join(articlesDir, folder, "article.meta.json");
  const topicId = folder.match(/^(B\d+)/)?.[1];
  if (!fs.existsSync(htmlPath) || !topicId) continue;

  let html = fs.readFileSync(htmlPath, "utf8");
  html = fixMarkdownBold(html);
  html = removeFreshnessLine(html);
  html = removeDuplicateAuditZayavka(html);
  html = dedupeLeadCta(html);
  html = unifyWhatNextCta(html);
  fs.writeFileSync(htmlPath, html);
  patchMeta(metaPath, topicId);
  console.log("patched", folder);
}
