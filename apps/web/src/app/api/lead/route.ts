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
      "<b>Новая заявка ThaiPass</b>",
      "",
      `<b>Имя:</b> ${escapeHtml(data.name)}`,
      `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
      `<b>Услуга:</b> ${escapeHtml(formatServiceLabel(data.service))}`,
      data.deadline
        ? `<b>Сроки:</b> ${escapeHtml(data.deadline)}`
        : null,
      data.comment
        ? `<b>Комментарий:</b> ${escapeHtml(data.comment)}`
        : null,
      "",
      `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK</i>`,
    ]
      .filter(Boolean)
      .join("\n");

    const sent = await sendTelegram(message);

    if (!sent && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Попробуйте WhatsApp." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, telegram: sent });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Неверные данные формы" }, { status: 400 });
    }
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
