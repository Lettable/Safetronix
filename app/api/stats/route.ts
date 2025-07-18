import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get total discoveries count
    const totalThreats = await db.collection("discoveries").countDocuments()

    // Get active investigations count
    const activeInvestigations = await db.collection("discoveries").countDocuments({
      status: { $in: ["ACTIVE INVESTIGATION", "MONITORING", "ESCALATED"] },
    })

    // Get resolved cases count
    const resolvedCases = await db.collection("discoveries").countDocuments({
      status: { $in: ["RESOLVED"] },
    });


    // Get unique platforms count
    const platformsResult = await db.collection("discoveries").distinct("platform")
    const platformsCovered = platformsResult.length

    // Get threat reports count
    const threatReports = await db.collection("threatreports").countDocuments()

    // Get contact forms count
    const contactForms = await db.collection("contactforms").countDocuments()

    return NextResponse.json({
      success: true,
      stats: {
        totalThreats,
        activeInvestigations,
        resolvedCases,
        platformsCovered,
        threatReports,
        contactForms,
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
