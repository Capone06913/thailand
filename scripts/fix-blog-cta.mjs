import fs from "fs";
import path from "path";

const dir = "teya-memory/blog/articles";
const zayavkaLi =
  /<li><a href="https:\/\/thaipass\.ru\/#zayavka">Получить бесплатный разбор кейса<\/a> — подскажем пакет ThaiPass под вашу ситуацию\.<\/li>\s*/g;

for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f, "article.html");
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, "utf8");
  h = h.replace(zayavkaLi, "");
  h = h.replace(/Оставить заявку можно через \./g, "");
  h = h.replace(
    /заявку на сопровождение можно оставить через \./g,
    "используйте форму заявки на сайте"
  );
  h = h.replace(/Оставить заявку на сопровождение: \./g, "");
  h = h.replace(
    /заявки через  с уведомлением/g,
    "заявки через форму на сайте с уведомлением"
  );
  fs.writeFileSync(p, h);
}
console.log("done");
