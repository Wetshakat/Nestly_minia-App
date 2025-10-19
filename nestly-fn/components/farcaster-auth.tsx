"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreatorRegistration } from "./creator-registration"

interface FarcasterAuthProps {
  onAuthSuccess: (user: any, role: "traveler" | "creator") => void
}

export function FarcasterAuth({ onAuthSuccess }: FarcasterAuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"traveler" | "creator" | null>(null)
  const [showCreatorForm, setShowCreatorForm] = useState(false)

  const handleFarcasterLogin = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/farcaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      })

      if (response.ok) {
        const data = await response.json()
        if (selectedRole === "creator" && !data.user.is_approved) {
          setShowCreatorForm(true)
        } else {
          onAuthSuccess(data.user, selectedRole)
        }
      }
    } catch (error) {
      console.error("Farcaster login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showCreatorForm) {
    return (
      <CreatorRegistration
        onSuccess={(user) => onAuthSuccess(user, "creator")}
        onBack={() => {
          setShowCreatorForm(false)
          setSelectedRole(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Nestly</h1>
          <p className="text-white/90 text-lg font-light">Discover Local Attractions & Collect Souvenirs</p>
        </div>

        <div className="space-y-3 mb-8">
          <div
            onClick={() => setSelectedRole("traveler")}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform ${
              selectedRole === "traveler"
                ? "bg-white shadow-2xl scale-105"
                : "bg-white/15 hover:bg-white/25 backdrop-blur-sm hover:scale-102"
            }`}
          >
            <h2 className={`text-xl font-bold mb-2 ${selectedRole === "traveler" ? "text-primary" : "text-white"}`}>
              Traveler
            </h2>
            <p className={selectedRole === "traveler" ? "text-foreground text-sm" : "text-white/80 text-sm"}>
              Explore attractions and collect NFT souvenirs
            </p>
          </div>

          <div
            onClick={() => setSelectedRole("creator")}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform ${
              selectedRole === "creator"
                ? "bg-white shadow-2xl scale-105"
                : "bg-white/15 hover:bg-white/25 backdrop-blur-sm hover:scale-102"
            }`}
          >
            <h2 className={`text-xl font-bold mb-2 ${selectedRole === "creator" ? "text-primary" : "text-white"}`}>
              Creator
            </h2>
            <p className={selectedRole === "creator" ? "text-foreground text-sm" : "text-white/80 text-sm"}>
              Register attractions and manage events
            </p>
          </div>
        </div>

        <Button
          onClick={handleFarcasterLogin}
          disabled={!selectedRole || isLoading}
          className="w-full bg-accent hover:bg-accent text-accent-foreground font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          {isLoading ? "Connecting..." : "Sign in with Farcaster"}
        </Button>

        <p className="text-center text-white/70 text-sm mt-6 font-light">Secure authentication via Farcaster</p>
      </div>
    </div>
  )
}
