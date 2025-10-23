import { type NextRequest, NextResponse } from "next/server"

const MOCK_ATTRACTIONS = [
  {
    id: 1,
    name: "Eiffel Tower",
    description: "Iconic iron lattice tower in Paris, France. Built in 1889 for the World's Fair.",
    latitude: 48.8584,
    longitude: 2.2945,
    price: 15,
    creator: { id: 1, username: "paris_tours", company_name: "Paris Tourism" },
  },
  {
    id: 2,
    name: "Big Ben",
    description: "Historic clock tower in London, England. One of the most iconic symbols of the UK.",
    latitude: 51.4975,
    longitude: -0.1357,
    price: 12,
    creator: { id: 2, username: "london_guides", company_name: "London Experiences" },
  },
  {
    id: 3,
    name: "Statue of Liberty",
    description: "Colossal neoclassical sculpture in New York. A symbol of freedom and democracy.",
    latitude: 40.6892,
    longitude: -74.0445,
    price: 20,
    creator: { id: 3, username: "ny_adventures", company_name: null },
  },
  {
    id: 4,
    name: "Colosseum",
    description: "Ancient Roman amphitheater in Rome, Italy. One of the most impressive structures of ancient Rome.",
    latitude: 41.8902,
    longitude: 12.4924,
    price: 18,
    creator: { id: 1, username: "rome_tours", company_name: "Rome Heritage" },
  },
  {
    id: 5,
    name: "Taj Mahal",
    description: "Ivory-white marble mausoleum in Agra, India. A masterpiece of Mughal architecture.",
    latitude: 27.1751,
    longitude: 78.0421,
    price: 25,
    creator: { id: 4, username: "india_explorer", company_name: "India Tours" },
  },
  {
    id: 6,
    name: "Great Wall of China",
    description: "Ancient defensive wall in China. One of the most impressive architectural feats in history.",
    latitude: 40.4319,
    longitude: 116.5704,
    price: 22,
    creator: { id: 5, username: "china_adventures", company_name: null },
  },
]

export async function GET(request: NextRequest) {
  try {
    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    console.log("[v0] Fetching attractions from:", djangoUrl)

    const response = await fetch(`${djangoUrl}/creators/attractions/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Django API not available, returning mock attractions")
      return NextResponse.json(MOCK_ATTRACTIONS)
    }

    const attractions = await response.json()

    const formattedAttractions = attractions.map((attr: any) => ({
      id: attr.id,
      name: attr.name,
      description: attr.description,
      latitude: Number.parseFloat(attr.latitude),
      longitude: Number.parseFloat(attr.longitude),
      price: attr.price || 0,
      creator: {
        id: attr.creator?.id,
        username: attr.creator?.username || "Unknown",
        company_name: attr.creator?.company_name,
      },
    }))

    return NextResponse.json(formattedAttractions)
  } catch (error) {
    console.error("[v0] Attractions fetch error:", error)
    console.log("[v0] Returning mock attractions as fallback")
    return NextResponse.json(MOCK_ATTRACTIONS)
  }
}
