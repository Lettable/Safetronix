import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get category distribution
    const categoryStats = await db
      .collection("discoveries")
      .aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    const colors = {
      Terrorism: "#ef4444",
      "Child Exploitation": "#f97316",
      "DMCA/Piracy": "#3b82f6",
      Extremism: "#8b5cf6",
      "Financial Crime": "#10b981",
    }

    const chartData = categoryStats.map((item) => ({
      name: item._id,
      value: item.count,
      color: colors[item._id as keyof typeof colors] || "#6b7280",
    }))

    return NextResponse.json({
      success: true,
      chartData,
    })
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch chart data" }, { status: 500 })
  }
}
