"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreatorRegistrationProps {
  onSuccess: (user: any) => void
  onBack: () => void
}

interface CreatorFormData {
  creatorType: "individual" | "company";
  firstName: string;
  lastName: string;
  companyName: string;
  registrationNumber: string;
  address: string;
  phone: string;
}

const LOCAL_STORAGE_KEY = "creatorRegistrationFormData"

export function CreatorRegistration({ onSuccess, onBack }: CreatorRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreatorFormData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      return savedData
        ? JSON.parse(savedData)
        : {
            creatorType: "individual",
            firstName: "",
            lastName: "",
            companyName: "",
            registrationNumber: "",
            address: "",
            phone: "",
          }
    }
    return {
      creatorType: "individual",
      firstName: "",
      lastName: "",
      companyName: "",
      registrationNumber: "",
      address: "",
      phone: "",
    }
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/creators/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        if (typeof window !== "undefined") {
          localStorage.removeItem(LOCAL_STORAGE_KEY) // Clear data on success
        }
        onSuccess(data.user)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred during registration")
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-primary hover:text-primary-dark font-medium flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Creator Profile</h1>
          <p className="text-muted mb-8">
            Tell us about yourself and your attractions. This information helps travelers discover your unique
            experiences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Creator Type</label>
              <select
                name="creatorType"
                value={formData.creatorType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="individual">Individual Creator</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {formData.creatorType === "company" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company Ltd."
                    required={formData.creatorType === "company"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Registration Number</label>
                  <Input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="REG-123456"
                    required={formData.creatorType === "company"}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted mt-6 text-center">
            Your information is secure and will only be used to manage your attractions.
          </p>
        </div>
      </div>
    </div>
  )
}
