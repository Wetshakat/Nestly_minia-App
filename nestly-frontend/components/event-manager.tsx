"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Event {
  id: number
  attraction_id: number
  name: string
  date: string
  price: number
  capacity: number
  attendees: number
}

interface EventManagerProps {
  attractionId: number
  role: "traveler" | "creator" | null
}

export function EventManager({ attractionId, role }: EventManagerProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    price: 0,
    capacity: 0,
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/attractions/${attractionId}/events`)
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.log("Failed to fetch events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [attractionId])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/attractions/${attractionId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newEvent = await response.json()
        setEvents([...events, newEvent])
        setFormData({ name: "", date: "", price: 0, capacity: 0 })
        setShowForm(false)
      }
    } catch (error) {
      console.log("Failed to create event:", error)
    }
  }

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm("Delete this event?")) return

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEvents(events.filter((e) => e.id !== eventId))
      }
    } catch (error) {
      console.log("Failed to delete event:", error)
    }
  }

  if (isLoading) {
    return <div className="text-muted">Loading events...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Events</h3>
        {role === "creator" && (
          <Button
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            {showForm ? "Cancel" : "+ Add Event"}
          </Button>
        )}
      </div>

      {showForm && role === "creator" && (
        <form onSubmit={handleCreateEvent} className="p-4 border border-input rounded-lg space-y-3 bg-card">
          <Input
            type="text"
            placeholder="Event name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              required
            />
            <Input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
            Create Event
          </Button>
        </form>
      )}

      {events.length === 0 ? (
        <p className="text-muted text-sm">No events scheduled yet</p>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-3 border border-input rounded-lg bg-card flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-muted">
                  {new Date(event.date).toLocaleDateString()} • ${event.price} • {event.attendees}/{event.capacity}
                </p>
              </div>
              {role === "creator" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 bg-transparent"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
