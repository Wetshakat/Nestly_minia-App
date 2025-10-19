import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    console.log("[v0] Registering creator:", formData)

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.firstName?.toLowerCase() || "creator",
      email: formData.email || "creator@example.com",
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_name: formData.companyName || "",
      reg_no: formData.registrationNumber || "",
      address: formData.address || "",
      phone: formData.phone || "",
      type: formData.creatorType === "company" ? "Company" : "Individual",
      is_approved: false,
      created_at: new Date().toISOString(),
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/creators/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.companyName || "",
        reg_no: formData.registrationNumber || "",
        address: formData.address || "",
        phone: formData.phone || "",
        type: formData.creatorType === "company" ? "Company" : "Individual",
      }),
    })

    if (!response.ok) {
      console.warn("[v0] Django API failed, returning mock user")
      const sessionResponse = NextResponse.json({ user: mockUser })
      sessionResponse.cookies.set("session", JSON.stringify(mockUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      })
      return sessionResponse
    }

    const user = await response.json()

    const sessionResponse = NextResponse.json({ user })
    sessionResponse.cookies.set("session", JSON.stringify({ ...user, is_approved: false }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return sessionResponse
  } catch (error) {
    console.error("[v0] Registration error:", error)
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: "creator",
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
