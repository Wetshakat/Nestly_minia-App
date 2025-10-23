import { type NextRequest, NextResponse } from "next/server"

const MOCK_FAVORITES = [
  {
    id: 1,
    name: "Eiffel Tower",
    description: "Iconic iron lattice tower in Paris, France.",
    latitude: 48.8584,
    longitude: 2.2945,
    price: 15,
    creator: { username: "paris_tours", company_name: "Paris Tourism" },
  },
  {
    id: 4,
    name: "Colosseum",
    description: "Ancient Roman amphitheater in Rome, Italy.",
    latitude: 41.8902,
    longitude: 12.4924,
    price: 18,
    creator: { username: "rome_tours", company_name: "Rome Heritage" },
  },
  {
    id: 5,
    name: "Taj Mahal",
    description: "Ivory-white marble mausoleum in Agra, India.",
    latitude: 27.1751,
    longitude: 78.0421,
    price: 25,
    creator: { username: "india_explorer", company_name: "India Tours" },
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Fetching favorites for user ID:", params.id)

    if (params.id === "demo_user_123") {
      return NextResponse.json(MOCK_FAVORITES)
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/users/${params.id}/favorites/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Favorites not found in Django, returning mock favorites")
      return NextResponse.json(MOCK_FAVORITES)
    }

    const favorites = await response.json()
    return NextResponse.json(favorites || [])
  } catch (error) {
    console.error("[v0] Fetch favorites error:", error)
    console.log("[v0] Returning mock favorites as fallback")
    return NextResponse.json(MOCK_FAVORITES)
  }
}
