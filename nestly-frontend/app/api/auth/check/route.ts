import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookie = cookies().get("user-token");
  if (!cookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = JSON.parse(cookie.value);
    return NextResponse.json({ user, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
}
