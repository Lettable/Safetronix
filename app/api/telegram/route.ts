import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "7896369852:AAGr1Rql2GDBRfTWNPjw9kcQbGM2S_TcBE4"
const TELEGRAM_CHAT_ID = "6586350542"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
