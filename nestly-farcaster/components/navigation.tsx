"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  user: any
  role: "traveler" | "creator" | null
  onLogout: () => void
}

export function Navigation({ user, role, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Nestly</h1>
          <span className="text-xs font-semibold bg-accent/20 text-accent px-3 py-1 rounded-full">
            {role === "creator" ? "Creator" : "Traveler"}
          </span>
        </div>
         <div >
          <ul className="flex items-center gap-4 ">
            <li className="hover:  transition-all duration-300 text-primary">Discover</li>
            <li className="hover:bg-muted/50  transition-all duration-300 text-primary">Plans</li>
            <li className="hover:bg-muted/50  transition-all duration-300 text-primary">Messages</li>
          </ul>
         </div>
        <div className="flex items-center gap-4">
          {user?.username && (
            <div className="text-sm text-muted-foreground font-medium hidden sm:block">@{user.username}</div>
          )}
          <Button
            onClick={onLogout}
            variant="outline"
            className="text-sm bg-transparent hover:bg-muted/50 border-border transition-all duration-300 rounded-lg"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
