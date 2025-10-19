"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AttractionCard } from "./attraction-card"

interface FavoritesListProps {
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

export function FavoritesList({ userId, onBack }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<Attraction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/favorites`)
        if (response.ok) {
          const data = await response.json()
          setFavorites(data)
        }
      } catch (error) {
        console.log("[v0] Failed to fetch favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [userId])

  const handleRemoveFavorite = async (attractionId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}/favorites/${attractionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setFavorites(favorites.filter((a) => a.id !== attractionId))
      }
    } catch (error) {
      console.log("[v0] Failed to remove favorite:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted">Loading favorites...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Favorites</h2>
          <p className="text-muted">Attractions you've saved</p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted mb-4">You haven't saved any favorites yet</p>
          <Button onClick={onBack} className="bg-primary hover:bg-primary-dark text-white">
            Browse Attractions
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((attraction) => (
            <div key={attraction.id} className="relative">
              <AttractionCard attraction={attraction} role="traveler" onSelect={() => {}} />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 text-red-500 bg-transparent"
                onClick={() => handleRemoveFavorite(attraction.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
