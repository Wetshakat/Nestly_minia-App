"use client"

import { useState, useEffect } from "react"

// Mock authentication hook
export const useAuth = () => {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    avatar?: string;
    farcasterAddress?: string;
    is_approved?: boolean;
    created_at?: string;
  } | null>(null)
  const [role, setRole] = useState<"traveler" | "creator" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
            const checkAuth = async () => {
              try {
                const res = await fetch("/api/auth/check")
                if (res.ok) {
                  const data = await res.json()
                  setUser(data.user)
                  setRole(data.role)
                } else if (res.status === 401) {
                  // Not authenticated
                  setUser(null)
                  setRole(null)
                } else {
                  // Other errors
                  setError(`Authentication check failed: ${res.statusText}`)
                  setUser(null)
                  setRole(null)
                }
              } catch (err) {
                setError("Failed to check authentication status.")
                setUser(null)
                setRole(null)
              } finally {
                setIsLoading(false)
              }
            }
            checkAuth()
          }, [])
  const login = (user: { id: string; username: string; avatar?: string }, userRole: "traveler" | "creator") => {
    setIsLoading(true)
    setUser(user)
    setRole(userRole)
    setIsLoading(false)
  }

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Failed to logout", error);
    }
    setUser(null);
    setRole(null);
    setIsLoading(false);
  };

  return { user, role, isLoading, error, login, logout }
}