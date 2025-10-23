"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FavoritesList } from "@/components/favorites-list"
import { Navigation } from "@/components/navigation"

export default function PlansPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<"traveler" | "creator" | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (!response.ok) {
          router.push("/login") // Redirect to login if not authenticated
          return
        }
        const data = await response.json()
        setUser(data.user)
        setRole(data.role)
      } catch (error) {
        console.error("Auth check failed for plans page:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = () => {
    // Implement actual logout logic here
    setUser(null)
    setRole(null)
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading your plans...</p>
      </div>
    )
  }

  if (!user) {
    return null // Should be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} role={role} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <FavoritesList userId={user.id} onBack={() => router.push("/discover")} />
          
      </main>
    </div>
  )
}

interface AuthenticatedUser {
  id: number;
  username: string;
}
