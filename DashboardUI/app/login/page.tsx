'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [deviceId, setDeviceId] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the device ID
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to Netra</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Connect to Device
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

