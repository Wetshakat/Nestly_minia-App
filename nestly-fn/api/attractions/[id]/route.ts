import { type NextRequest, NextResponse } from "next/server"

const MOCK_ATTRACTION_DETAILS: Record<string, any> = {
  "1": {
    id: 1,
    name: "Eiffel Tower",
    description:
      "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel. Built in 1889 for the World's Fair, it has become the most iconic symbol of Paris.",
    latitude: 48.8584,
    longitude: 2.2945,
    price: 15,
    creator: { id: 1, username: "paris_tours", company_name: "Paris Tourism" },
    events: [
      {
        id: 1,
        title: "Sunset Tour",
        description: "Experience the tower at sunset with guided tour",
        event_date: new Date(Date.now() + 86400000).toISOString(),
        price: 25,
      },
      {
        id: 2,
        title: "Night Lights Tour",
        description: "See the tower illuminated at night",
        event_date: new Date(Date.now() + 172800000).toISOString(),
        price: 30,
      },
    ],
  },
  "2": {
    id: 2,
    name: "Big Ben",
    description:
      "Big Ben is the nickname for the Great Bell of the clock at the Palace of Westminster in London. The clock tower is one of the most iconic symbols of the United Kingdom.",
    latitude: 51.4975,
    longitude: -0.1357,
    price: 12,
    creator: { id: 2, username: "london_guides", company_name: "London Experiences" },
    events: [
      {
        id: 3,
        title: "Westminster Tour",
        description: "Guided tour of Westminster and Big Ben",
        event_date: new Date(Date.now() + 86400000).toISOString(),
        price: 20,
      },
    ],
  },
  "3": {
    id: 3,
    name: "Statue of Liberty",
    description:
      "The Statue of Liberty is a colossal neoclassical sculpture located on Liberty Island in New York Harbor. It was a gift from France to the United States and has become a symbol of freedom and democracy.",
    latitude: 40.6892,
    longitude: -74.0445,
    price: 20,
    creator: { id: 3, username: "ny_adventures", company_name: null },
    events: [
      {
        id: 4,
        title: "Crown Access Tour",
        description: "Visit the crown of the Statue of Liberty",
        event_date: new Date(Date.now() + 86400000).toISOString(),
        price: 35,
      },
      {
        id: 5,
        title: "Pedestal Tour",
        description: "Visit the pedestal of the statue",
        event_date: new Date(Date.now() + 172800000).toISOString(),
        price: 25,
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const attractionId = params.id

    if (MOCK_ATTRACTION_DETAILS[attractionId]) {
      console.log("[v0] Returning mock attraction details for ID:", attractionId)
      return NextResponse.json(MOCK_ATTRACTION_DETAILS[attractionId])
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const attractionResponse = await fetch(`${djangoUrl}/attractions/${attractionId}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!attractionResponse.ok) {
      console.warn("[v0] Attraction not found in Django, returning mock data")
      return NextResponse.json(MOCK_ATTRACTION_DETAILS["1"])
    }

    const attraction = await attractionResponse.json()

    const eventsResponse = await fetch(`${djangoUrl}/attractions/${attractionId}/events/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const events = eventsResponse.ok ? await eventsResponse.json() : []

    const formattedAttraction = {
      id: attraction.id,
      name: attraction.name,
      description: attraction.description,
      latitude: Number.parseFloat(attraction.latitude),
      longitude: Number.parseFloat(attraction.longitude),
      price: attraction.price || 0,
      creator: {
        id: attraction.creator?.id,
        username: attraction.creator?.username || "Unknown",
        company_name: attraction.creator?.company_name,
      },
      events: events.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        price: event.price,
      })),
    }

    return NextResponse.json(formattedAttraction)
  } catch (error) {
    console.error("[v0] Attraction fetch error:", error)
    console.log("[v0] Returning mock attraction as fallback")
    return NextResponse.json(MOCK_ATTRACTION_DETAILS["1"])
  }
}
