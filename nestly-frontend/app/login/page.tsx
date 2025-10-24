"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreatorRegistration } from "@/components/creator-registration"
import { TravelerRegistration } from "@/components/traveler-registration"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const { user, role, isLoading, login } = useAuth()
  const [registrationStep, setRegistrationStep] = useState("auth") // 'auth', 'chooseRole', 'registerCreator', 'registerTraveler'

  // Load saved step on mount
  useEffect(() => {
    const savedStep = localStorage.getItem("registrationStep")
    if (savedStep) setRegistrationStep(savedStep)
  }, [])

  // Save step to localStorage
  useEffect(() => {
    localStorage.setItem("registrationStep", registrationStep)
  }, [registrationStep])

  // Redirect if user is already logged in
  useEffect(() => {
    if (!isLoading && user) {
      if (role === "traveler" || (role === "creator" && user.is_approved)) {
        router.replace("/")
      } else {
        setRegistrationStep("chooseRole")
      }
    }
  }, [user, isLoading, router, role])

  // Simulated auth success (e.g. login button)
  const handleBasicAuthSuccess = async () => {
    const mockUser = { name: "Guest User", email: "guest@example.com" }
    setRegistrationStep("chooseRole")
    await login(mockUser, null)
  }
  

  // Handle registration success
  const handleRegistrationSuccess = async (registeredUser, registeredRole) => {
    await login(registeredUser, registeredRole)
    router.replace("/")
  }

  const handleBackToAuth = () => {
    setRegistrationStep("auth")
  }

  const handleBackToRoleChoice = () => {
    setRegistrationStep("chooseRole")
  }

  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
      {/* Step 1: Basic Authentication */}
      {registrationStep === "auth" && !user && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome to Nestly</h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in or register to discover and share unique experiences.
          </p>
          <Button
            onClick={handleBasicAuthSuccess}
            className="w-full py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Continue with Email
          </Button>
        </div>
      )}

      {/* Step 2: Choose Role */}
      {registrationStep === "chooseRole" && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">Choose Your Role</h2>
          <p className="text-gray-600 mb-6">How would you like to use Nestly?</p>
          <div className="space-y-4">
            <Button
              onClick={() => setRegistrationStep("registerCreator")}
              className="w-full py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Register as a Creator
            </Button>
            <Button
              onClick={() => setRegistrationStep("registerTraveler")}
              className="w-full py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Register as a Traveler
            </Button>
            <Button
              onClick={handleBackToAuth}
              variant="outline"
              className="w-full py-3 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Authentication
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Creator Registration */}
      {registrationStep === "registerCreator" && (
        <CreatorRegistration
          onSuccess={(user) => handleRegistrationSuccess(user, "creator")}
          onBack={handleBackToRoleChoice}
        />
      )}

      {/* Step 4: Traveler Registration */}
      {registrationStep === "registerTraveler" && (
        <TravelerRegistration
          onSuccess={(user) => handleRegistrationSuccess(user, "traveler")}
          onBack={handleBackToRoleChoice}
        />
      )}
    </div>
  )
}
