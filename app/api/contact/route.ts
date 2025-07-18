import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Store recent IPs in memory (in production, use Redis or database)
const recentIPs = new Map<string, number>()

// Clean up old IPs every hour
setInterval(
  () => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    for (const [ip, timestamp] of recentIPs.entries()) {
      if (timestamp < oneHourAgo) {
        recentIPs.delete(ip)
      }
    }
  },
  60 * 60 * 1000,
)

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const contacts = await db.collection("contactforms").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      contacts: contacts.map((contact) => ({
        ...contact,
        _id: contact._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown"

    // Check if IP has made a request in the last hour
    const lastRequest = recentIPs.get(ip)
    const oneHourAgo = Date.now() - 60 * 60 * 1000

    if (lastRequest && lastRequest > oneHourAgo) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait before submitting again." },
        { status: 429 },
      )
    }

    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Store the contact form
    const contact = {
      name,
      email,
      message,
      ip,
      createdAt: new Date(),
      status: "unread",
    }

    await db.collection("contactforms").insertOne(contact)

    // Update IP timestamp
    recentIPs.set(ip, Date.now())

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to submit contact form" }, { status: 500 })
  }
}
