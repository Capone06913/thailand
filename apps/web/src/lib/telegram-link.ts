import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/lib/services";

/** Deep link в Telegram-бот с готовым текстом заявки по услуге. */
export function buildTelegramServiceLink(service: Service): string {
  const botUrl = siteConfig.telegramBotUrl?.replace(/\/$/, "");
  if (botUrl) {
    const params = new URLSearchParams();
    params.set("text", service.telegramPreset);
    return `${botUrl}?${params.toString()}`;
  }
  return siteConfig.telegramChannelUrl || "#";
}

export function hasTelegramBotLink(): boolean {
  return Boolean(siteConfig.telegramBotUrl || siteConfig.telegramChannelUrl);
}
