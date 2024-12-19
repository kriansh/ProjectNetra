import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function ListeningCard() {
  return (
    <Card className="absolute top-16 right-4 w-64 z-10">
      <CardContent className="p-4">
        <div className="flex items-center justify-center">
          <div className="text-green-500 font-semibold">Listening</div>
          <div className="ml-2 flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

