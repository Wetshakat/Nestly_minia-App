import { type NextRequest, NextResponse } from "next/server"

const MOCK_USER_PROFILE = {
  id: "demo_user_123",
  username: "demo_traveler",
  email: "traveler@example.com",
  farcasterAddress: "0x1234567890abcdef",
  is_approved: false,
  created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  bio: "Passionate traveler exploring the world",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo_traveler",
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Fetching user profile for ID:", params.id)

    if (params.id === "demo_user_123") {
      return NextResponse.json(MOCK_USER_PROFILE)
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/creators/${params.id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] User not found in Django, returning mock profile")
      return NextResponse.json(MOCK_USER_PROFILE)
    }

    const user = await response.json()
    return NextResponse.json(user)
  } catch (error) {
    console.error("[v0] Fetch user error:", error)
    console.log("[v0] Returning mock user profile as fallback")
    return NextResponse.json(MOCK_USER_PROFILE)
  }
}
