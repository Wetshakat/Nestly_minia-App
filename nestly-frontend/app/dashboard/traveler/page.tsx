"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"
import { EmptyState } from "@/components/empty-state"
import { CreatorDashboard } from "@/components/creator-dashboard"

export default function TravelerDashboardPage() {
  const { user, role, isLoading, error } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && role !== "traveler") {
      router.push("/dashboard/creator") // Redirect non-travelers
    }
  }, [user, role, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading dashboard"
        description={error}
        buttonText="Try again"
        buttonAction={() => window.location.reload()}
      />
    )
  }

  if (!user || role !== "traveler") {
    return null // Should be redirected by useEffect
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Traveler Dashboard</h1>
      {/* Traveler specific dashboard content would go here */}
      <p>Welcome, {user.username}! This is your traveler dashboard.</p>
      {/* Example: Display some traveler-specific data or components */}
    </div>
  )
}
