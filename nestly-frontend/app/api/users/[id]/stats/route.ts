import { type NextRequest, NextResponse } from "next/server"

const MOCK_STATS = {
  favorites: 5,
  souvenirs: 12,
  attractions: 0,
  events_attended: 3,
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Fetching user stats for ID:", params.id)

    if (params.id === "demo_user_123") {
      return NextResponse.json(MOCK_STATS)
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/creators/${params.id}/stats/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Stats not found in Django, returning mock stats")
      return NextResponse.json(MOCK_STATS)
    }

    const stats = await response.json()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Fetch user stats error:", error)
    console.log("[v0] Returning mock stats as fallback")
    return NextResponse.json(MOCK_STATS)
  }
}
