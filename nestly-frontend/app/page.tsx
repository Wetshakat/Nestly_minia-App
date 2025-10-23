"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  MapPin,
  Camera,
  Star,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export default function LandingPageImproved() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="relative">
       <section
  aria-labelledby="hero-heading"
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/img117.jpg')" }}
>
  {/* Orange and Black blend overlay */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-orange-500/30 mix-blend-multiply" />
    <div className="absolute inset-0 bg-black/80" />
  </div>

  <div className="relative container mx-auto px-6 py-16 md:py-28 lg:py-36 flex flex-col-reverse md:flex-row items-center gap-12 text-white">
    <div className="w-full md:w-6/12 text-center md:text-left">
      <h1
        id="hero-heading"
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
      >
        Discover The World Around You, Share Unforgettable Experiences
      </h1>

      <p className="text-lg sm:text-xl max-w-2xl mb-8 opacity-90 bg-orange-600/40 backdrop-blur-lg rounded-lg p-4 shadow-lg text-white font-semibold">
        Nestly connects travellers with authentic attractions and local
        creators. Explore hidden gems, collect digital keepsakes, and
        turn every trip into a memory.
      </p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-4">
        <Button asChild size="lg" variant="secondary">
          <Link href="/discover" aria-label="Start exploring">
            <span className="inline-flex items-center">
              Start exploring
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
            </span>
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="bg-white/20 text-white border-white hover:bg-white/30"
        >
          <Link href="/login">Become a creator</Link>
        </Button>
      </div>

      <div className="mt-8 text-sm opacity-80 backdrop-blur-lg">
        <span className="mr-4">Trusted by creators & travellers</span>
        <span className="inline-block ml-2 font-medium">•</span>
        <span className="ml-2">
          Low fees • On-chain receipts • Community verified
        </span>
      </div>
    </div>
  </div>
</section>


        <section aria-labelledby="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2
              id="how-it-works"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How Nestly works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Simple steps to find and share experiences — built for travellers
              and creators alike.
            </p>

            <div className="grid gap-8 sm:grid-cols-3">
              <Feature
                title="Discover"
                description="Browse a curated map of attractions created by local makers. Filter by mood, distance or popularity."
                icon={<MapPin className="h-6 w-6" aria-hidden />}
              />
              <Feature
                title="Experience"
                description="Attend events, collect unique digital souvenirs, and leave ratings to help others."
                icon={<Camera className="h-6 w-6" aria-hidden />}
              />
              <Feature
                title="Share"
                description="Create attractions, manage availability, and connect directly with travellers."
                icon={<Star className="h-6 w-6" aria-hidden />}
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Built for creators and travellers
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Whether you want to explore local culture or build an audience
                around unique experiences, Nestly gives you the tools to do
                both.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Star className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-semibold">Digital Souvenirs</h4>
                    <p className="text-muted-foreground">
                      Mint collectibles and save memories from every visit.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <MessageSquare className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-semibold">Direct Messaging</h4>
                    <p className="text-muted-foreground">
                      Communicate with creators to plan or get tips.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-semibold">Creator Tools</h4>
                    <p className="text-muted-foreground">
                      Simple dashboards to publish and manage listings.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img111.jpg"
                alt="Travellers at a market"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to join the adventure?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create your account and start exploring or sharing today.
            </p>

            <div className="inline-flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg">
                    Get started{" "}
                    <ChevronDown className="ml-2 h-5 w-5" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Register as a creator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Register as a traveller</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button asChild size="lg" variant="ghost">
                <Link href="/discover">Explore listings</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 border-t bg-muted/20">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Nestly — Crafted with care by
            local creators. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="p-3 bg-primary/10 rounded-full inline-flex">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
}
