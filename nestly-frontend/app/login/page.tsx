"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { FarcasterAuth } from "@/components/farcaster-auth"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const router = useRouter()
  const { user, role, isLoading, login } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleAuthSuccess = async (authenticatedUser: any, userRole: "traveler" | "creator") => {
    await login(authenticatedUser, userRole);
    router.push("/");
  };

  return <FarcasterAuth onAuthSuccess={handleAuthSuccess} />
}
