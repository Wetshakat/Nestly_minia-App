"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { CreatorDashboard } from "@/components/creator-dashboard"
import { Spinner } from "@/components/ui/spinner"
import { EmptyState } from "@/components/empty-state"

export default function CreatorDashboardPage() {
  const { user, role, isLoading, error } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && role !== "creator") {
      router.push("/dashboard/traveler") // Redirect non-creators
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

  if (!user || role !== "creator") {
    return null // Should be redirected by useEffect
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>
      <CreatorDashboard creatorId={user.id} />
    </div>
  )
}

