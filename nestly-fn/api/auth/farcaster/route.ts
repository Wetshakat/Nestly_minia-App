import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()

    if (!role || !["traveler", "creator"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: `user_${Math.random().toString(36).substr(2, 5)}`,
      farcasterAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      is_approved: role === "traveler",
      created_at: new Date().toISOString(),
    }

    const response = NextResponse.json({
      user: mockUser,
      role,
    })

    response.cookies.set("session", JSON.stringify(mockUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Farcaster auth error:", error)
    return NextResponse.json({ error: "Auth failed" }, { status: 400 })
  }
}
