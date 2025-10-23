import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 🧠 Mock database of users (temporary in-memory data)
const mockUsers = {
  traveler: {
    id: 1,
    username: "OnlyRacy",
    email: "traveler@example.com",
    is_approved: true,
    role: "traveler",
    image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=500&q=80", // 🖼️ Traveler profile image
  },
  creator: {
    id: 2,
    username: "CreatorHub",
    email: "creator@example.com",
    is_approved: false, // Creator must complete registration first
    role: "creator",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80", // 🖼️ Creator profile image
  },
};

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    // ✅ Validate role
    if (!role || !["traveler", "creator"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid or missing role. Must be 'traveler' or 'creator'." },
        { status: 400 }
      );
    }

    // 🕹️ Simulate Farcaster login
    const user = mockUsers[role as "traveler" | "creator"];
    console.log(`[Farcaster] ${role} login attempt...`);

    // Small delay for realism
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set cookie
    cookies().set("user-token", JSON.stringify(user), { httpOnly: true });

    // ✅ Return success JSON
    return NextResponse.json(
      {
        message: "Authentication successful",
        user,
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[FarcasterAuth] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
