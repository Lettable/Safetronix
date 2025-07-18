import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid report ID" }, { status: 400 })
    }

    const { action } = body

    let updateData: any = { updatedAt: new Date() }

    if (action === "approve") {
      updateData.status = "approved"
    } else if (action === "reject") {
      updateData.status = "rejected"
    } else {
      updateData = { ...body, updatedAt: new Date() }
    }

    const result = await db
      .collection("threatreports")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating threat report:", error)
    return NextResponse.json({ success: false, error: "Failed to update threat report" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid report ID" }, { status: 400 })
    }

    const result = await db.collection("threatreports").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting threat report:", error)
    return NextResponse.json({ success: false, error: "Failed to delete threat report" }, { status: 500 })
  }
}
