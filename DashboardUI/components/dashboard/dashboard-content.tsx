'use client'

import React, { useState } from 'react'
import { Battery, Wifi, Settings, Bell, User, Mic, Book, LogOut } from 'lucide-react'
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { ListeningCard } from "@/components/listening-card"


interface DashboardContentProps {
  batteryLevel: number
  audioSpeed: number
  setAudioSpeed: (value: number) => void
  vibrationIntensity: number
  setVibrationIntensity: (value: number) => void
  audioSpeedEnabled: boolean
  setAudioSpeedEnabled: (value: boolean) => void;
}

export function DashboardContent({ 
  batteryLevel, 
  audioSpeed, 
  setAudioSpeed, 
  vibrationIntensity, 
  setVibrationIntensity,
  audioSpeedEnabled,
  setAudioSpeedEnabled
}: DashboardContentProps) {

  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  //const [audioSpeed, setAudioSpeed] = React.useState(50); // Initial value for audio speed
  //const [vibrationIntensity, setVibrationIntensity] = React.useState(50); // Initial value for vibration intensity
  //const [audioSpeedEnabled, setAudioSpeedEnabled] = React.useState(true); // Ensure this state controls the 'disabled' prop


  const handleLogout = () => {
    // Implement logout logic here
    router.push('/login')
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-white min-h-screen text-blue-600">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-blue-600">Netra Dashboard</h1>
          <LanguageSwitcher />
        </div>
        <div className="flex items-center space-x-4 text-black">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Memory"
            onClick={() => router.push('/memory')}
          >
            <Book className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Microphone"
            onClick={() => setIsListening(!isListening)}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Settings"
            onClick={() => router.push('/device-settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="relative h-8 w-8 rounded-full" 
            aria-label="Profile"
            onClick={() => router.push('/profile')}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      {isListening && <ListeningCard />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Device Status</CardTitle>
            <Wifi className={`w-4 h-4 ${batteryLevel > 20 ? 'text-green-400' : 'text-red-400'}`} />
          </CardHeader>
          <div className="p-6">
            <div className="text-2xl font-bold">Online</div>
            <p className="text-xs text-blue-400">Firmware v2.1.0</p>
          </div>
        </GlassCard>
        <GlassCard className="glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
            <Battery className="w-4 h-4" />
          </CardHeader>
          <div className="p-6">
            <div className="text-2xl font-bold">{batteryLevel}%</div>
            <div className="w-full bg-green-100 rounded-full h-2.5 mt-2">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${batteryLevel}%` }}
              ></div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <Settings className="w-4 h-4" />
          </CardHeader>
          <div className="p-6">
            <div className="text-2xl font-bold">2 hours ago</div>
            <p className="text-xs text-blue-400">Language settings changed</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 bg-green-500 text-white hover:bg-green-600"
            >
              Sync Setting
            </Button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="glow">
        <CardHeader>
          <CardTitle>Device Settings</CardTitle>
        </CardHeader>
        <div className="p-6">
          <Button className="w-full" onClick={() => router.push('/device-settings')}>
            Go to Device Settings
          </Button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="glow">
          <CardHeader>
            <CardTitle>Language Settings</CardTitle>
          </CardHeader>
          <div className="p-6">
            <Select>
              <SelectTrigger className="bg-white border-blue-400">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ne">Nepali</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlassCard>
        <GlassCard className="glow">
          <CardHeader>
            <CardTitle>Relationship</CardTitle>
          </CardHeader>
          <div className="p-6">
            <Select>
              <SelectTrigger className="bg-white border-blue-400">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brother">Brother</SelectItem>
                <SelectItem value="sister">Sister</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlassCard>
  
        <GlassCard className="glow">
          <CardHeader>
            <CardTitle>Reading Modes</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span>Text-to-Speech</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Audio Summaries</span>
              <Switch />
            </div>
          </div>
        </GlassCard>
        <GlassCard className="glow">
          <CardHeader>
            <CardTitle>Customization</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Audio Speed</label>
              </div>
              <div className="flex items-center space-x-2">
                <Slider
                  disabled={!audioSpeedEnabled}
                  value={[audioSpeed]}
                  onValueChange={(value) => setAudioSpeed(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="flex-grow"
                />
                <span className="text-sm font-medium w-8 text-right">
                  {audioSpeed}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vibration Intensity</label>
              <Slider
                value={[vibrationIntensity]}
                onValueChange={(value) => setVibrationIntensity(value[0])}
                max={100}
                className="bg-white"
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}

