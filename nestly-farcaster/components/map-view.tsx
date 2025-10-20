"use client"

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
}

interface MapViewProps {
  attractions: Attraction[]
}

export function MapView({ attractions }: MapViewProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="h-96 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
        <div className="text-center">
          <p className="text-6xl mb-4">🗺️</p>
          <p className="text-xl font-semibold text-foreground mb-2">Map View</p>
          <p className="text-muted mb-4">
            {attractions.length} attraction{attractions.length !== 1 ? "s" : ""} to explore
          </p>

          {attractions.length > 0 && (
            <div className="mt-6 bg-white border border-border rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-sm font-semibold text-foreground mb-3">Attractions:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {attractions.map((a) => (
                  <div key={a.id} className="text-xs text-muted flex justify-between items-center">
                    <span className="truncate">{a.name}</span>
                    <span className="text-accent font-semibold ml-2">{a.price > 0 ? `$${a.price}` : "Free"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted/50 mt-6">Integrate with Mapbox or Google Maps for interactive map</p>
        </div>
      </div>
    </div>
  )
}
