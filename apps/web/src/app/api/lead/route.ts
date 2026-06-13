import { NextResponse } from "next/server";
import { z } from "zod";
import { serviceOptions } from "@/lib/services";

const leadSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(3),
  service: z.string().min(1),
  deadline: z.string().optional(),
  comment: z.string().optional(),
});

function formatServiceLabel(slug: string): string {
  return serviceOptions.find((o) => o.value === slug)?.label ?? slug;
}

async function sendTelegram(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_LEAD_CHAT_ID;
  if (!token || !chatId) return false;

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    },
  );
  return res.ok;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const message = [
      "<b>РќРѕРІР°СЏ Р·Р°СЏРІРєР° ThaiPass</b>",
      "",
      `<b>РРјСЏ:</b> ${escapeHtml(data.name)}`,
      `<b>РљРѕРЅС‚Р°РєС‚:</b> ${escapeHtml(data.contact)}`,
      `<b>РЈСЃР»СѓРіР°:</b> ${escapeHtml(formatServiceLabel(data.service))}`,
      data.deadline
        ? `<b>РЎСЂРѕРєРё:</b> ${escapeHtml(data.deadline)}`
        : null,
      data.comment
        ? `<b>РљРѕРјРјРµРЅС‚Р°СЂРёР№:</b> ${escapeHtml(data.comment)}`
        : null,
      "",
      `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK</i>`,
    ]
      .filter(Boolean)
      .join("\n");

    const sent = await sendTelegram(message);

    if (!sent && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ. РџРѕРїСЂРѕР±СѓР№С‚Рµ WhatsApp." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, telegram: sent });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "РќРµРІРµСЂРЅС‹Рµ РґР°РЅРЅС‹Рµ С„РѕСЂРјС‹" }, { status: 400 });
    }
    return NextResponse.json({ error: "Р’РЅСѓС‚СЂРµРЅРЅСЏСЏ РѕС€РёР±РєР°" }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

