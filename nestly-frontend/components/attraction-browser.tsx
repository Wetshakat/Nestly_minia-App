"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AttractionCard } from "./attraction-card"
import { MapView } from "./mapview"

import { AttractionCardSkeleton } from "./skeleton-loader"
import { EmptyState } from "./empty-state"

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
}

interface AttractionBrowserProps {
  role: "traveler" | "creator" | null
  onSelectAttraction?: (id: number) => void
}

export function AttractionBrowser({ role, onSelectAttraction }: AttractionBrowserProps) {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await fetch("/api/attractions")
        if (response.ok) {
          const data = await response.json()
          setAttractions(data)
          setFilteredAttractions(data)
        }
      } catch (error) {
        console.error("Failed to fetch attractions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttractions()
  }, [])

  useEffect(() => {
    const filtered = attractions.filter(
      (attraction) =>
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredAttractions(filtered)
  }, [searchQuery, attractions])

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-3 text-foreground">Discover Attractions</h2>
        <p className="text-muted-foreground text-lg">
          {role === "creator"
            ? "Manage your attractions and events"
            : "Explore local attractions and collect souvenirs"}
        </p>
      </div>

      {role === "creator" && (
        <div className="mb-8">
          <Button className="bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
            + Add New Attraction
          </Button>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-96">
          <Input
            placeholder="Search attractions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-border focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="text-sm rounded-lg"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className="text-sm rounded-lg"
          >
            Map
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <AttractionCardSkeleton key={i} />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon={searchQuery ? "🔍" : "📍"}
                title={searchQuery ? "No attractions found" : "No attractions yet"}
                description={
                  searchQuery
                    ? "Try adjusting your search terms"
                    : role === "creator"
                      ? "Be the first to add an attraction to your collection"
                      : "Check back soon for new attractions"
                }
                action={
                  role === "creator" && !searchQuery
                    ? {
                        label: "Add First Attraction",
                        onClick: () => {
                          /* Handle add attraction */
                        },
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            filteredAttractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                role={role}
                onSelect={() => {
                  setSelectedAttraction(attraction)
                  onSelectAttraction?.(attraction.id)
                }}
              />
            ))
          )}
        </div>
      ) : (
        <MapView attractions={filteredAttractions} />
      )}
    </div>
  )
}
