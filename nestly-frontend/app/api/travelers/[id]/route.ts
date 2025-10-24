import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // In a real application, you would fetch data from your database or smart contracts
  // For now, we return mock data
  const mockTravelerData = {
    id: id,
    username: "traveler_" + id,
    email: `${id}@example.com`,
    balance: 123.45,
    souvenirs: [
      { id: 1, name: "Eiffel Tower Mini", attractionName: "Eiffel Tower" },
      { id: 2, name: "Louvre Pyramid Replica", attractionName: "Louvre Museum" },
    ],
    visitedLocations: [
      { id: 1, name: "Eiffel Tower", dateVisited: "2023-01-15" },
      { id: 2, name: "Louvre Museum", dateVisited: "2023-01-16" },
      { id: 3, name: "Notre Dame Cathedral", dateVisited: "2023-01-17" },
    ],
  }

  return NextResponse.json(mockTravelerData)
}
