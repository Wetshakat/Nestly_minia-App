import { type NextRequest, NextResponse } from "next/server"

const MOCK_CREATOR_ATTRACTIONS: Record<string, any[]> = {
  demo_user_123: [],
  "1": [
    {
      id: 1,
      name: "Eiffel Tower",
      description: "Iconic iron lattice tower in Paris, France.",
      latitude: 48.8584,
      longitude: 2.2945,
      price: 15,
    },
    {
      id: 4,
      name: "Colosseum",
      description: "Ancient Roman amphitheater in Rome, Italy.",
      latitude: 41.8902,
      longitude: 12.4924,
      price: 18,
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Fetching attractions for creator ID:", params.id)

    if (MOCK_CREATOR_ATTRACTIONS[params.id]) {
      return NextResponse.json(MOCK_CREATOR_ATTRACTIONS[params.id])
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/attractions/?creator_id=${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Attractions not found in Django, returning empty array")
      return NextResponse.json([])
    }

    const attractions = await response.json()
    return NextResponse.json(attractions || [])
  } catch (error) {
    console.error("[v0] Fetch creator attractions error:", error)
    console.log("[v0] Returning mock attractions as fallback")
    return NextResponse.json(MOCK_CREATOR_ATTRACTIONS[params.id] || [])
  }
}
