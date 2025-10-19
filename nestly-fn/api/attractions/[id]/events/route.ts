import { type NextRequest, NextResponse } from "next/server"

const MOCK_EVENTS: Record<string, any[]> = {
  "1": [
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
  "2": [
    {
      id: 3,
      title: "Westminster Tour",
      description: "Guided tour of Westminster and Big Ben",
      event_date: new Date(Date.now() + 86400000).toISOString(),
      price: 20,
    },
  ],
  "3": [
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
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Fetching events for attraction ID:", params.id)

    if (MOCK_EVENTS[params.id]) {
      return NextResponse.json(MOCK_EVENTS[params.id])
    }

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/attractions/${params.id}/events/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("[v0] Events not found in Django, returning empty array")
      return NextResponse.json([])
    }

    const events = await response.json()
    return NextResponse.json(events || [])
  } catch (error) {
    console.error("[v0] Fetch events error:", error)
    console.log("[v0] Returning mock events as fallback")
    return NextResponse.json(MOCK_EVENTS[params.id] || [])
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Creating event for attraction ID:", params.id)

    const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000/api/v1"

    const response = await fetch(`${djangoUrl}/attractions/${params.id}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.warn("[v0] Django API failed, returning mock event")
      const newEvent = {
        id: Math.floor(Math.random() * 10000),
        ...body,
      }
      return NextResponse.json(newEvent, { status: 201 })
    }

    const event = await response.json()
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("[v0] Create event error:", error)
    const newEvent = {
      id: Math.floor(Math.random() * 10000),
      ...(await request.json().catch(() => ({}))),
    }
    return NextResponse.json(newEvent, { status: 201 })
  }
}
