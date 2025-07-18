import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get platforms monitored
    const platformsResult = await db.collection("discoveries").distinct("platform")
    const platformsMonitored = platformsResult.length

    // Get active investigations
    const activeInvestigations = await db.collection("discoveries").countDocuments({
      status: { $in: ["ACTIVE INVESTIGATION", "MONITORING", "ESCALATED"] },
    })

    // Get threats neutralized (resolved + escalated)
    const threatsNeutralized = await db.collection("discoveries").countDocuments({
      status: { $in: ["RESOLVED", "ESCALATED"] },
    })

    // For countries, we'll use a fixed number as we don't track this in discoveries
    const countriesCovered = 195

    return NextResponse.json({
      success: true,
      aboutStats: {
        platformsMonitored,
        activeInvestigations,
        threatsNeutralized,
        countriesCovered,
      },
    })
  } catch (error) {
    console.error("Error fetching about stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch about stats" }, { status: 500 })
  }
}
