const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "https://nestly-i46n.onrender.com/api/v1"

interface ApiResponse<T> {
  data?: T
  error?: string
  detail?: string
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type")
      let error = { error: "Unknown error" }

      if (contentType?.includes("application/json")) {
        error = await response.json().catch(() => ({ error: "Unknown error" }))
      }

      console.log("[v0] API error:", error)
      return { error: error.detail || error.error || "Request failed" }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.log("[v0] API call error:", error)
    return { error: error instanceof Error ? error.message : "Network error" }
  }
}

export async function djangoCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const url = `${DJANGO_API_URL}${endpoint}`

    console.log("[v0] Django call to:", url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type")
      let error = { error: "Unknown error" }

      if (contentType?.includes("application/json")) {
        error = await response.json().catch(() => ({ error: "Unknown error" }))
      } else {
        const text = await response.text()
        console.log("[v0] Non-JSON response:", text.substring(0, 200))
        error = { error: `HTTP ${response.status}: ${response.statusText}` }
      }

      console.log("[v0] Django error:", error)
      return { error: error.detail || error.error || "Request failed" }
    }

    const data = await response.json()
    console.log("[v0] Django response:", data)
    return { data }
  } catch (error) {
    console.log("[v0] Django call error:", error)
    return { error: error instanceof Error ? error.message : "Network error" }
  }
}
