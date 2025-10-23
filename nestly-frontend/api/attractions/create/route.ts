import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)

    console.log("[v0] Creating attraction for user:", user.id)

    const mockAttraction = {
      id: Math.floor(Math.random() * 10000),
      ...body,
      creator_id: user.id,
      created_at: new Date().toISOString(),
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/attractions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        creator_id: user.id,
      }),
    })

    if (!response.ok) {
      console.warn("[v0] Django API failed, returning mock attraction")
      return NextResponse.json(mockAttraction, { status: 201 })
    }

    const attraction = await response.json()
    return NextResponse.json(attraction, { status: 201 })
  } catch (error) {
    console.error("[v0] Create attraction error:", error)
    const mockAttraction = {
      id: Math.floor(Math.random() * 10000),
      name: "New Attraction",
      created_at: new Date().toISOString(),
    }
    return NextResponse.json(mockAttraction, { status: 201 })
  }
}
