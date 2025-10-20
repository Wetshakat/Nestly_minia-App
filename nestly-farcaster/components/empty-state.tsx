"use client"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon = "📭", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-foreground mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="bg-primary hover:bg-primary text-primary-foreground font-semibold">
          {action.label}
        </Button>
      )}
    </div>
  )
}
