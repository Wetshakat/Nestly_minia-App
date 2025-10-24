import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CreatorRegistration } from "./creator-registration"

interface FarcasterAuthProps {
  onAuthSuccess: (user: any, role: "traveler" | "creator") => void
}

const LOCAL_STORAGE_ROLE_KEY = "farcasterSelectedRole"

export function FarcasterAuth({ onAuthSuccess }: FarcasterAuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"traveler" | "creator" | null>(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY)
      return savedRole as "traveler" | "creator" | null
    }
    return null
  })
  const [showCreatorForm, setShowCreatorForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  useEffect(() => {
    if (typeof window !== "undefined" && selectedRole) {
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, selectedRole)
    }
  }, [selectedRole])

  const handleFarcasterLogin = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement actual Farcaster authentication here to get real fid, message, and signature.
      // This would typically involve using a Farcaster client library to prompt the user to sign a message.
      // For now, this will make the Farcaster login non-functional until real implementation is added.
      const mockFid = 123; // Mock FID
      const mockMessage = `Signed message for FID ${mockFid}`;
      const mockSignature = `0x${Math.random().toString(16).substr(2, 64)}`;

      const response = await fetch("/api/auth/farcaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole, fid: mockFid, message: mockMessage, signature: mockSignature }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        let errorMessage = "Authentication failed"

        if (contentType?.includes("application/json")) {
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorMessage
          } catch {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`
          }
        } else {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }

        setError(errorMessage)
        console.error("Farcaster login error:", errorMessage)
        return
      }

      const contentType = response.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        setError("Invalid response from server")
        console.error("Non-JSON response received")
        return
      }

      const data = await response.json()
      

      if (selectedRole === "creator" && !data.user.is_approved) {
        setShowCreatorForm(true)
      } else {
        if (typeof window !== "undefined") {
          localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY) // Clear role on success
        }
        onAuthSuccess(data.user, selectedRole)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error"
      setError(errorMessage)
      console.error("Farcaster login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showCreatorForm) {
    return (
      <CreatorRegistration
        onSuccess={(user) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY) // Clear role on creator registration success
          }
          onAuthSuccess(user, "creator")
        }}
        onBack={() => {
          setShowCreatorForm(false)
          setSelectedRole(null)
          
          if (typeof window !== "undefined") {
            localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY)
          }
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

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

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
