import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      const mockUser = {
        id: "user1",
        username: "Alice Traveler",
        farcasterAddress: "0x1234567890abcdef",
        is_approved: false,
        created_at: new Date().toISOString(),
      }

      console.log("[v0] No session found, returning mock user for demo")
      return NextResponse.json({
        user: mockUser,
        role: "traveler",
        isDemo: true,
      })
    }

    const user = JSON.parse(sessionCookie.value)
    const role = user.is_approved ? "creator" : "traveler"

    return NextResponse.json({
      user,
      role,
      isDemo: false,
    })
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    const mockUser = {
      id: "demo_user_123",
      username: "demo_traveler",
      farcasterAddress: "0x1234567890abcdef",
      is_approved: false,
      created_at: new Date().toISOString(),
    }
    return NextResponse.json({
      user: mockUser,
      role: "traveler",
      isDemo: true,
    })
  }
}
