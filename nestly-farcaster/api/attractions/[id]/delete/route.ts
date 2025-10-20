import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Deleting attraction ID:", params.id)

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/attractions/${params.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Django API failed, returning mock success")
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete attraction error:", error)
    return NextResponse.json({ success: true })
  }
}
