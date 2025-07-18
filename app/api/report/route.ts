import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, platform, description, category, anonymous } = body

    // Here you would normally save to Supabase
    // const { data, error } = await supabase
    //   .from('reports')
    //   .insert([
    //     {
    //       name: anonymous ? 'Anonymous' : name,
    //       platform,
    //       description,
    //       category,
    //       created_at: new Date().toISOString()
    //     }
    //   ])

    // Send to Telegram
    const telegramMessage = `
🚨 <b>NEW THREAT REPORT</b> 🚨

<b>Name:</b> ${anonymous ? "Anonymous" : name}
<b>Platform:</b> ${platform}
<b>Categories:</b> ${category.join(", ")}
<b>Description:</b> ${description}

<b>Submitted:</b> ${new Date().toLocaleString()}
    `

    // Send to Telegram using our API route
    try {
      await fetch(`${request.nextUrl.origin}/api/telegram`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: telegramMessage,
        }),
      })
    } catch (telegramError) {
      console.error("Failed to send Telegram notification:", telegramError)
      // Don't fail the entire request if Telegram fails
    }

    console.log("Report received:", { name: anonymous ? "Anonymous" : name, platform, category })

    return NextResponse.json({ success: true, message: "Report submitted successfully" })
  } catch (error) {
    console.error("Error processing report:", error)
    return NextResponse.json({ success: false, message: "Error processing report" }, { status: 500 })
  }
}
