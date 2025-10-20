"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface UserProfileProps {
  userId: number
  role: "traveler" | "creator" | null
  onBack: () => void
}

interface UserData {
  id: number
  username: string
  email: string
  type?: string
  phone?: string
  company_name?: string
  created_at: string
  favorites_count?: number
  souvenirs_count?: number
}

export function UserProfile({ userId, role, onBack }: UserProfileProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    favorites: 0,
    souvenirs: 0,
    attractions: 0,
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        if (response.ok) {
          const data = await response.json()
          setUser(data)

          // Fetch user stats
          const statsResponse = await fetch(`/api/users/${userId}/stats`)
          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            setStats(statsData)
          }
        }
      } catch (error) {
        console.log("[v0] Failed to fetch user profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [userId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted">Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted mb-4">Profile not found</p>
        <Button onClick={onBack} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button onClick={onBack} variant="outline" className="mb-6 bg-transparent">
        Back
      </Button>

      <div className="bg-card border border-input rounded-lg p-8 space-y-6">
        {/* Profile Header */}
        <div className="border-b border-input pb-6">
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <p className="text-muted">{user.email}</p>
          {user.company_name && <p className="text-sm text-muted mt-2">{user.company_name}</p>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background rounded-lg">
            <p className="text-2xl font-bold text-primary">{stats.favorites}</p>
            <p className="text-sm text-muted">Favorites</p>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <p className="text-2xl font-bold text-primary">{stats.souvenirs}</p>
            <p className="text-sm text-muted">Souvenirs</p>
          </div>
          {role === "creator" && (
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary">{stats.attractions}</p>
              <p className="text-sm text-muted">Attractions</p>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted">User Type</p>
            <p className="font-medium capitalize">{role || "Unknown"}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-sm text-muted">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted">Member Since</p>
            <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-input">
          <Button className="flex-1 bg-primary hover:bg-primary-dark text-white">Edit Profile</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
