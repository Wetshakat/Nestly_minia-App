"use client"

import Image from "next/image"

export function SkeletonLoader() {
  return (
    <div className="relative bg-muted animate-pulse rounded-lg h-full flex items-center justify-center">
      {/* Nestly logo easing in/out */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/nestlyy.png"
          alt="Nestly logo"
          width={60}
          height={60}
          className="animate-fade-in-out opacity-70"
        />
      </div>
    </div>
  )
}

export function AttractionCardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <SkeletonLoader />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        </div>
        <div className="h-10 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export function AttractionDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="relative h-64 bg-muted rounded-lg animate-pulse flex items-center justify-center">
        <Image
          src="/nestlyy.png"
          alt="Nestly logo"
          width={80}
          height={80}
          className="animate-fade-in-out opacity-70"
        />
      </div>
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/2" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
  