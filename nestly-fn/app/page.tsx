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

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          const data = await response.json()
          setIsAuthenticated(true)
          setFarcasterUser(data.user)
          setUserRole(data.role || "traveler")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
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
