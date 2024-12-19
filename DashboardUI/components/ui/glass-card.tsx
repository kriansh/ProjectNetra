import React from 'react'
import { Card, CardProps } from "@/components/ui/card"

export function GlassCard({ className, children, ...props }: React.PropsWithChildren<CardProps>) {
  return (
    <Card 
      className={`bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border border-blue-200 shadow-lg mb-4 ${className}`}
      {...props}
    >
      {children}
    </Card>
  )
}

