"use client"

import { useState } from "react"
import { AttractionBrowser } from "../../components/attraction-browser"
import { AttractionDetail } from "../../components/attraction-detail"
import dynamic from "next/dynamic"

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
  imageUrl?: string
}

// <-- corrected import: lowercase filename and pick the named export MapView
const MapView = dynamic(
  () => import("../../components/mapview").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => <div className="h-[500px] flex items-center justify-center">Loading map…</div>,
  }
)

import { SouvenirClaimModal } from "../../components/souvenir-claim-modal"

export default function DiscoverPage() {
  const [selectedAttractionId, setSelectedAttractionId] = useState<number | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [allAttractions, setAllAttractions] = useState<Attraction[]>([]);

  const handleAttractionsLoaded = (attractions: Attraction[]) => {
    setAllAttractions(attractions);
  };

  const handleSelectAttraction = (id: number) => {
    setSelectedAttractionId(id)
  }

  const handleBackToAttractions = () => {
    setSelectedAttractionId(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      <main className="flex-grow container mx-auto px-6 py-12">
        {selectedAttractionId ? (
          <AttractionDetail
            attractionId={selectedAttractionId}
            role={null}
            onBack={handleBackToAttractions}
            onClaimSouvenir={() => setIsClaimModalOpen(true)}
          />
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                Discover Attractions
              </h1>
              <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                Explore local gems, attractions, and unique experiences curated just for you.
              </p>
              <button
                onClick={() => {
                  setSelectedAttractionId(1);
                  setIsClaimModalOpen(true);
                }}
                className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-colors"
              >
                Claim Souvenir 
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Popular Experiences
                </h2>
                <AttractionBrowser
                  onSelectAttraction={handleSelectAttraction}
                  role={null}
                  onAttractionsLoaded={handleAttractionsLoaded}
                />
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-[600px] relative overflow-hidden">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Map Overview
                </h2>
                <div className="rounded-xl overflow-hidden border border-gray-200 h-full">
                  <MapView attractions={allAttractions} />
                </div>
              </div>
            </div>
          </>
        )}

        {isClaimModalOpen && selectedAttractionId && (
          <SouvenirClaimModal
            attractionId={selectedAttractionId}
            attractionName=""
            onClose={() => setIsClaimModalOpen(false)}
          />
        )}
      </main>

      <footer className="mt-16 py-8 bg-orange-100/40 text-center text-gray-700 border-t border-orange-200">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Nestly</span> — Discover the world around you 🌍
        </p>
      </footer>
    </div>
  )
}
