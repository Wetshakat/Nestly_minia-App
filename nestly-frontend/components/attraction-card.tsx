"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
  imageUrl?: string // Add imageUrl property
}

interface AttractionCardProps {
  attraction: Attraction
  role: "traveler" | "creator" | null
  onSelect: () => void
}

export function AttractionCard({ attraction, role, onSelect }: AttractionCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:border-accent/50 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={attraction.imageUrl || "/placeholder.jpg"} // Use imageUrl or a placeholder
          alt={attraction.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="font-bold text-lg line-clamp-1">{attraction.name}</h3>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-200">
          {attraction.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{attraction.description}</p>

        <div className="flex items-center justify-between mb-5 text-sm">
          <span className="text-accent font-semibold text-base">
            {attraction.price > 0 ? `$${attraction.price}` : "Free"}
          </span>
          <span className="text-muted-foreground text-xs font-medium">
            📍 {Math.abs(attraction.latitude).toFixed(2)}°
          </span>
        </div>

        <Button
          className="w-full bg-accent hover:bg-accent text-accent-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
        >
          {role === "creator" ? "Manage" : "View Details"}
        </Button>
      </div>
    </div>
  )
}
