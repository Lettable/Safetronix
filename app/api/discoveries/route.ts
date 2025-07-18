import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    const query: any = {}

    if (category && category !== "All") {
      query.category = category
    }

    if (status && status !== "All") {
      query.status = status
    }

    const discoveries = await db.collection("discoveries").find(query).sort({ date: -1 }).limit(limit).toArray()

    return NextResponse.json({
      success: true,
      discoveries: discoveries.map((discovery) => ({
        ...discovery,
        _id: discovery._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching discoveries:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch discoveries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const discovery = {
      ...body,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date(),
      confirmed: body.confirmed || false,
    }

    const result = await db.collection("discoveries").insertOne(discovery)

    return NextResponse.json({
      success: true,
      discovery: {
        ...discovery,
        _id: result.insertedId.toString(),
      },
    })
  } catch (error) {
    console.error("Error creating discovery:", error)
    return NextResponse.json({ success: false, error: "Failed to create discovery" }, { status: 500 })
  }
}
