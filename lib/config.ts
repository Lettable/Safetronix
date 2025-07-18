export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || "",
    key: process.env.SUPABASE_ANON_KEY || "",
  },
  admin: {
    key: process.env.ADMIN_KEY || "admin123",
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_CHAT_ID || "",
  },
}
