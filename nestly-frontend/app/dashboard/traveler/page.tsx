"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Wallet, Gem, Star } from "lucide-react"
import Link from "next/link"

// Mock data for the traveler dashboard
const travelerData = {
  id: "mock_traveler_id",
  username: "mockuser",
  email: "mock@user.com",
  balance: 1250.75,
  travelingPoints: 7500,
  souvenirs: [
    { id: 1, name: "Eiffel Tower NFT", attractionName: "Eiffel Tower" },
    { id: 2, name: "Louvre Museum NFT", attractionName: "Louvre Museum" },
    { id: 3, name: "Colosseum NFT", attractionName: "Colosseum" },
  ],
  visitedLocations: [
    { id: 1, name: "Eiffel Tower", dateVisited: "2023-10-15" },
    { id: 2, name: "Louvre Museum", dateVisited: "2023-10-16" },
    { id: 3, name: "Colosseum", dateVisited: "2023-09-20" },
    { id: 4, name: "Statue of Liberty", dateVisited: "2023-08-05" },
  ],
};

const travelSuggestions = [
  { id: 1, name: "Kyoto, Japan", description: "Experience ancient temples, beautiful gardens, and traditional geishas." },
  { id: 2, name: "Santorini, Greece", description: "Famous for its stunning sunsets, white-washed villages, and blue-domed churches." },
  { id: 3, name: "Machu Picchu, Peru", description: "Explore the ancient Incan city high in the Andes Mountains." },
  { id: 4, name: "Bora Bora, French Polynesia", description: "Relax in overwater bungalows and enjoy crystal-clear turquoise waters." }
]

export default function TravelerDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-400 to-orange-100">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
          Traveler Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.jpg" alt={travelerData.username} />
                <AvatarFallback>{travelerData.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{travelerData.username}</CardTitle>
                <p className="text-sm text-muted-foreground">{travelerData.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Traveling Points: {travelerData.travelingPoints}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Balance: ${travelerData.balance.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Gem className="mr-2 h-4 w-4" />
                  <span>NFTs Earned: {travelerData.souvenirs.length}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Places Visited: {travelerData.visitedLocations.length}</span>
                </div>
              </div>
              <Button className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/discover">Explore More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* NFTs Earned Card */}
          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">NFTs Earned</CardTitle>
            </CardHeader>
            <CardContent>
              {travelerData.souvenirs.length === 0 ? (
                <p className="text-muted-foreground">You haven't collected any NFTs yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {travelerData.souvenirs.map((souvenir) => (
                    <div key={souvenir.id} className="border rounded-lg p-4 flex flex-col items-center text-center bg-orange-50">
                      <Gem className="h-12 w-12 text-yellow-500 mb-2" />
                      <p className="font-semibold">{souvenir.name}</p>
                      <p className="text-sm text-muted-foreground">from {souvenir.attractionName}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Visited Locations Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Places Visited</CardTitle>
          </CardHeader>
          <CardContent>
            {travelerData.visitedLocations.length === 0 ? (
              <p className="text-muted-foreground">You haven't visited any locations yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {travelerData.visitedLocations.map((location) => (
                  <div key={location.id} className="border rounded-lg p-4 flex flex-col items-center text-center bg-orange-50">
                    <MapPin className="h-12 w-12 text-green-500 mb-2" />
                    <p className="font-semibold">{location.name}</p>
                    <p className="text-sm text-muted-foreground">Visited on {location.dateVisited}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Travel Suggestions Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Travel Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {travelSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4 flex flex-col bg-orange-50">
                  <h3 className="font-semibold text-lg mb-2">{suggestion.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{suggestion.description}</p>
                  <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href="/discover">Learn More</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
