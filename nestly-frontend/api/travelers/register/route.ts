import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    console.log("[v0] Registering traveler:", formData)

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username?.toLowerCase() || "traveler",
      email: formData.email || "traveler@example.com",
      first_name: formData.firstName,
      last_name: formData.lastName,
      is_approved: false, // Travelers are not approved as creators
      created_at: new Date().toISOString(),
    }

    // In a real application, you would interact with your backend here
    // For now, we'll simulate a successful registration and set a session cookie

    const sessionResponse = NextResponse.json({ user: mockUser })
    sessionResponse.cookies.set("session", JSON.stringify(mockUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return sessionResponse
  } catch (error) {
    console.error("[v0] Traveler registration error:", error)
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: "traveler",
      is_approved: false,
      created_at: new Date().toISOString(),
    }
    const sessionResponse = NextResponse.json({ user: mockUser })
    sessionResponse.cookies.set("session", JSON.stringify(mockUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })
    return sessionResponse
  }
}
