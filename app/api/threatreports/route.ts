import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const reports = await db.collection("threatreports").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      reports: reports.map((report) => ({
        ...report,
        _id: report._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching threat reports:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch threat reports" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const { name, platform, description, category, anonymous } = body

    if (!platform || !description || !category || category.length === 0) {
      return NextResponse.json(
        { success: false, error: "Platform, description, and category are required" },
        { status: 400 },
      )
    }

    const report = {
      name: anonymous ? "Anonymous" : name || "Anonymous",
      platform,
      description,
      category,
      anonymous: anonymous || false,
      status: "pending",
      createdAt: new Date(),
    }

    const result = await db.collection("threatreports").insertOne(report)

    // Send to Telegram
    const telegramMessage = `
🚨 <b>NEW THREAT REPORT</b> 🚨

<b>Name:</b> ${report.name}
<b>Platform:</b> ${platform}
<b>Categories:</b> ${category.join(", ")}
<b>Description:</b> ${description}

<b>Submitted:</b> ${new Date().toLocaleString()}
    `

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
    }

    return NextResponse.json({
      success: true,
      message: "Threat report submitted successfully",
      reportId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error submitting threat report:", error)
    return NextResponse.json({ success: false, error: "Failed to submit threat report" }, { status: 500 })
  }
}
