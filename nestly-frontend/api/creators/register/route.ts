import { type NextRequest, NextResponse } from "next/server"
import { users } from "../auth/farcaster/route"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const { fid } = formData // Expect FID from the frontend

    if (!fid) {
      return NextResponse.json({ error: "Farcaster ID (fid) is required for creator registration" }, { status: 400 })
    }

    let user = users.get(fid)

    if (!user) {
      return NextResponse.json({ error: "User not found. Please authenticate with Farcaster first." }, { status: 404 })
    }

    // Update user details
    user = {
      ...user,
      username: formData.firstName?.toLowerCase() || user.username,
      email: formData.email || user.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_name: formData.companyName || "",
      reg_no: formData.registrationNumber || "",
      address: formData.address || "",
      phone: formData.phone || "",
      type: formData.creatorType === "company" ? "Company" : "Individual",
      is_approved: true, // Creator is now approved after registration
    }
    users.set(fid, user)

    const sessionResponse = NextResponse.json({ user: user })
    sessionResponse.cookies.set("session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return sessionResponse
  } catch (error) {
    console.error("[v0] Creator registration error:", error)
    return NextResponse.json({ error: "Creator registration failed" }, { status: 500 })
  }
}
