import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("user-token");
  return NextResponse.json({ message: "Logged out" });
}
