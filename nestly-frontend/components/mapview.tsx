"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import React from "react"

// Fix Leaflet icon path issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export function MapView() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative">
      {/* Orange overlay for Nestly theme */}
      <div className="absolute inset-0 bg-orange-500 opacity-10 z-[400] pointer-events-none"></div>

      <MapContainer
        center={[9.8965, 8.8583]} // Example: Plateau State, Nigeria
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full z-[300]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={[9.8965, 8.8583]}>
          <Popup>
            📍 <b>Nestly HQ</b> <br /> Explore the world around you!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
