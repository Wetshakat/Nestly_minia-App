import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "../components/footer"
import { Navigation } from "../components/navigation"

export const metadata: Metadata = {
  title: "Nestly - Discover Local Attractions",
  description: "Explore attractions and collect NFT souvenirs"
   
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
