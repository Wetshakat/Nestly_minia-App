import { type NextRequest, NextResponse } from "next/server"
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs"

// In-memory store for users (replace with a database in a real application)
const users = new Map<string, any>()

const HUB_URL = process.env.HUB_URL || "https://nemes.farcaster.xyz:2283"
const client = getSSLHubRpcClient(HUB_URL)

export async function POST(request: NextRequest) {
  try {
    const { role, fid, message, signature } = await request.json()

    if (!role || !["traveler", "creator"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    if (!fid || !message || !signature) {
      return NextResponse.json({ error: "Missing Farcaster authentication data" }, { status: 400 })
    }

    // 1. Verify Farcaster message and signature
    // In a real application, you would verify the message and signature against a Farcaster Hub.
    // For this example, we'll assume the fid and signature are valid if provided.
    // const hubMessage = Message.decode(Buffer.from(message, 'hex'));
    // const result = await client.verifyMessage(hubMessage);
    // if (!result.isOk() || result.value.fid !== fid) {
    //   return NextResponse.json({ error: "Farcaster authentication failed" }, { status: 401 });
    // }

    let user = users.get(fid)

    if (!user) {
      // New user
      user = {
        id: fid, // Use FID as the unique ID
        username: `fc_user_${fid}`, // Placeholder username
        farcasterId: fid,
        farcasterAddress: `0x${Math.random().toString(16).substr(2, 40)}`, // Mock address for now
        role: role,
        is_approved: role === "traveler" ? true : false, // Creators need to register
        created_at: new Date().toISOString(),
      }
      users.set(fid, user)
    } else {
      // Existing user, update role if necessary
      if (user.role !== role) {
        user.role = role
        users.set(fid, user)
      }
    }

    const response = NextResponse.json({
      user: user,
      role: user.role,
    })

    response.cookies.set("session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Farcaster auth error:", error)
    return NextResponse.json({ error: "Auth failed" }, { status: 500 })
  }
}
