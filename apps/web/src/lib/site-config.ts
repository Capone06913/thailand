export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "ThaiPass",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thaipass.ru",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  telegramChannelUrl: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL ?? "",
  telegramChannelName:
    process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_NAME ?? "@thaipass_visa",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  officeCity: process.env.NEXT_PUBLIC_OFFICE_CITY ?? "Москва",
  officeAddress: process.env.NEXT_PUBLIC_OFFICE_ADDRESS ?? "",
  officeMetro: process.env.NEXT_PUBLIC_OFFICE_METRO ?? "",
};
