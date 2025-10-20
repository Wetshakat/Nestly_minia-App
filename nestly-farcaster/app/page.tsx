"use client"

import { useEffect, useState } from "react"
import { FarcasterAuth } from "@/components/farcaster-auth"
import { Navigation } from "@/components/navigation"
import { AttractionBrowser } from "@/components/attraction-browser"
import { AttractionDetail } from "@/components/attraction-detail"

type UserRole = "traveler" | "creator" | null

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [farcasterUser, setFarcasterUser] = useState<any>(null)
  const [selectedAttractionId, setSelectedAttractionId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")

        if (!response.ok) {
          console.log("[v0] Auth check returned non-OK status:", response.status)
          setIsLoading(false)
          return
        }

        const contentType = response.headers.get("content-type")
        if (!contentType?.includes("application/json")) {
          console.log("[v0] Auth check returned non-JSON response")
          setIsLoading(false)
          return
        }

        const data = await response.json()
        setIsAuthenticated(true)
        setFarcasterUser(data.user)
        setUserRole(data.role || "traveler")
      } catch (error) {
        console.log("[v0] Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleAuthSuccess = (user: any, role: UserRole) => {
    setIsAuthenticated(true)
    setFarcasterUser(user)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setFarcasterUser(null)
    setUserRole(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nestly</h1>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <FarcasterAuth onAuthSuccess={handleAuthSuccess} />
  }

  if (selectedAttractionId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation user={farcasterUser} role={userRole} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <AttractionDetail
            attractionId={selectedAttractionId}
            role={userRole}
            onBack={() => setSelectedAttractionId(null)}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={farcasterUser} role={userRole} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <AttractionBrowser role={userRole} onSelectAttraction={setSelectedAttractionId} />
      </main>
    </div>
  )
}
