"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AttractionCard } from "./attraction-card"

interface CreatorDashboardProps {
  userId: number
  onBack: () => void
}

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
}

export function CreatorDashboard({ userId, onBack }: CreatorDashboardProps) {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchCreatorAttractions = async () => {
      try {
        const response = await fetch(`/api/creators/${userId}/attractions`)
        if (response.ok) {
          const data = await response.json()
          setAttractions(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch creator attractions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCreatorAttractions()
  }, [userId])

  const handleDeleteAttraction = async (attractionId: number) => {
    if (!confirm("Are you sure you want to delete this attraction?")) return

    try {
      const response = await fetch(`/api/attractions/${attractionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAttractions(attractions.filter((a) => a.id !== attractionId))
      }
    } catch (error) {
      console.error("[v0] Failed to delete attraction:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted">Loading your attractions...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Attractions</h2>
          <p className="text-muted">Manage your tourism attractions and events</p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Browse
        </Button>
      </div>

      {!showForm && (
        <div className="mb-8">
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-dark text-white">
            + Add New Attraction
          </Button>
        </div>
      )}

      {showForm && (
        <div className="mb-8 p-6 border border-input rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">Create New Attraction</h3>
          {/* Form will be added here */}
          <Button onClick={() => setShowForm(false)} variant="outline">
            Cancel
          </Button>
        </div>
      )}

      {attractions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted mb-4">You haven't created any attractions yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-dark text-white">
            Create Your First Attraction
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="relative">
              <AttractionCard attraction={attraction} role="creator" onSelect={() => {}} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs text-red-500 bg-transparent"
                  onClick={() => handleDeleteAttraction(attraction.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
