"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavigationProps {
  user?: {
    username: string;
    email?: string;
    avatar?: string;
  } | null;
  role?: "traveler" | "creator" | null;
  onLogout?: () => void;
}

export function Navigation({ user, role, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <Image
              src="/nestlyy.png"   
              alt="Nestly logo"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </Link>

          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-accent transition-all duration-300"
          >
            Nestly
          </Link>

          {role && (
            <span className="text-xs font-semibold bg-accent/20 text-accent px-3 py-1 rounded-full">
              {role === "creator" ? "Creator" : "Traveler"}
            </span>
          )}
        </div>

        <div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/discover" className="hover:text-accent transition-all duration-300">Discover</Link>
            </li>
            {user && role === "traveler" && (
              <li>
                <Link href="/plans" className="hover:text-accent transition-all duration-300">Plans</Link>
              </li>
            )}
            {user && role === "creator" && (
              <li>
                <Link href="/creator/attractions" className="hover:text-accent transition-all duration-300">Manage Attractions</Link>
              </li>
            )}
            {user && (
              <li>
                <Link href={role === "creator" ? "/dashboard/creator" : "/dashboard/traveler"} className="hover:text-accent transition-all duration-300">Dashboard</Link>
              </li>
            )}
            <li>
              <Link href="/messages" className="hover:text-accent transition-all duration-300">Messages</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={"/placeholder-user.jpg"} alt="@Racy.Traveler" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">@Racy.Traveler</p>
                  <p className="text-xs leading-none text-muted-foreground">racy.traveler@nestly.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={role === "creator" ? "/dashboard/creator" : "/dashboard/traveler"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLogout && onLogout()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
