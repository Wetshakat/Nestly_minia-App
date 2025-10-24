"use client"

import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

interface Attraction {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  price: number
  imageUrl?: string
}

interface MapViewProps {
  attractions: Attraction[]
}


const proto: any =
  (L && (L as any).Icon && (L as any).Icon.Default && (L as any).Icon.Default.prototype) ||
  (L as any).Icon?.Default?.prototype;

if (proto) {
 
  delete proto._getIconUrl;
}

;(L as any).Icon?.Default?.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
} as any);

export function MapView({ attractions }: MapViewProps) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative">
      <div className="absolute inset-0 bg-orange-500 opacity-10 z-[400] pointer-events-none"></div>

      <MapContainer
        center={[9.8965, 8.8583]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full z-[300]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {attractions.map((attraction) => (
          <Marker key={attraction.id} position={[attraction.latitude, attraction.longitude]}>
            <Popup>
              <b>{attraction.name}</b> <br /> {attraction.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
