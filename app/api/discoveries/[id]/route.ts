import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid discovery ID" }, { status: 400 })
    }

    const discovery = await db.collection("discoveries").findOne({ _id: new ObjectId(params.id) })

    if (!discovery) {
      return NextResponse.json({ success: false, error: "Discovery not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      discovery: {
        ...discovery,
        _id: discovery._id.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching discovery:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch discovery" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid discovery ID" }, { status: 400 })
    }

    const result = await db.collection("discoveries").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Discovery not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating discovery:", error)
    return NextResponse.json({ success: false, error: "Failed to update discovery" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid discovery ID" }, { status: 400 })
    }

    const result = await db.collection("discoveries").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Discovery not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting discovery:", error)
    return NextResponse.json({ success: false, error: "Failed to delete discovery" }, { status: 500 })
  }
}
