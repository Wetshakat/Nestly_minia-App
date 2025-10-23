"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SouvenirClaimModal } from "./souvenir-claim-modal"
import { AttractionDetailSkeleton } from "./skeleton-loader"
import { EmptyState } from "./empty-state"

interface AttractionDetailData {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
  creator: {
    username: string
    company_name?: string
  }
  events: Array<{
    id: number
    title: string
    description: string
    eventDate: string
    price: number
  }>
}

interface AttractionDetailProps {
  attractionId: number
  role: "traveler" | "creator" | null
  onBack: () => void
}

export function AttractionDetail({ attractionId, role, onBack }: AttractionDetailProps) {
  const [attraction, setAttraction] = useState<AttractionDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"info" | "events">("info")
  const [showClaimModal, setShowClaimModal] = useState(false)

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await fetch(`/api/attractions/${attractionId}`)
        if (response.ok) {
          const data = await response.json()
          setAttraction(data)
        }
      } catch (error) {
        console.error("Failed to fetch attraction:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttraction()
  }, [attractionId])

  if (isLoading) {
    return (
      <div>
        <Button onClick={onBack} variant="outline" className="mb-6 bg-transparent">
          ← Back to Attractions
        </Button>
        <AttractionDetailSkeleton />
      </div>
    )
  }

  if (!attraction) {
    return (
      <div>
        <Button onClick={onBack} variant="outline" className="mb-6 bg-transparent">
          ← Back to Attractions
        </Button>
        <EmptyState
          icon="❌"
          title="Attraction not found"
          description="This attraction may have been removed or is no longer available."
          action={{
            label: "Go Back",
            onClick: onBack,
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div>
        <Button onClick={onBack} variant="outline" className="mb-6 bg-transparent hover:bg-muted/50 transition-colors">
          ← Back to Attractions
        </Button>

        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-accent h-64 flex items-center justify-center relative overflow-hidden">
            <span className="text-7xl animate-bounce" style={{ animationDuration: "3s" }}>
              📍
            </span>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-foreground">{attraction.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                <span className="text-sm">By {attraction.creator.company_name || attraction.creator.username}</span>
                <span>•</span>
                <span className="text-accent font-semibold">
                  {attraction.price > 0 ? `$${attraction.price}` : "Free"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 border-b border-border mb-6">
              <button
                onClick={() => setActiveTab("info")}
                className={`pb-3 px-2 font-medium transition-all duration-200 relative ${
                  activeTab === "info" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Information
                {activeTab === "info" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`pb-3 px-2 font-medium transition-all duration-200 relative ${
                  activeTab === "events" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Events ({attraction.events.length})
                {activeTab === "events" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            </div>

            {activeTab === "info" ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-3 text-foreground">About</h2>
                  <p className="text-foreground leading-relaxed">{attraction.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Latitude</p>
                    <p className="font-semibold text-foreground">{attraction.latitude.toFixed(4)}°</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Longitude</p>
                    <p className="font-semibold text-foreground">{attraction.longitude.toFixed(4)}°</p>
                  </div>
                </div>

                {role === "traveler" && (
                  <Button
                    onClick={() => setShowClaimModal(true)}
                    className="w-full bg-accent hover:bg-accent text-accent-foreground font-bold py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                  >
                    Claim Souvenir NFT
                  </Button>
                )}

                {role === "creator" && (
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-md">
                      Edit Attraction
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {attraction.events.length === 0 ? (
                  <EmptyState
                    icon="📅"
                    title="No events scheduled"
                    description="This attraction doesn't have any events yet. Check back soon!"
                    action={
                      role === "creator"
                        ? {
                            label: "Create Event",
                            onClick: () => {
                              /* Handle create event */
                            },
                          }
                        : undefined
                    }
                  />
                ) : (
                  attraction.events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md hover:border-accent/30 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                        <span className="text-accent font-semibold">${event.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          📅 {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                        {role === "traveler" && (
                          <Button className="bg-accent hover:bg-accent text-accent-foreground text-sm rounded-lg transition-all duration-300 hover:shadow-md active:scale-95">
                            Book Event
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showClaimModal && (
        <SouvenirClaimModal
          attractionId={attractionId}
          attractionName={attraction.name}
          onClose={() => setShowClaimModal(false)}
        />
      )}
    </>
  )
}
