'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Pencil, HelpCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [deviceName, setDeviceName] = useState('Netra')
  const [editedDeviceName, setEditedDeviceName] = useState(deviceName)
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfoChanged, setPersonalInfoChanged] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/login') // Redirect to login page after logout
  }

  //const handleSave = () => {
  //  console.log('Save device name:', deviceName)
  //  setIsEditing(false)
  //}

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Removed "Back to Dashboard" button */}
          <div>
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              {isEditing ? (
                <>
                  <Input
                    id="deviceName"
                    value={editedDeviceName}
                    onChange={(e) => setEditedDeviceName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={() => {
                      setDeviceName(editedDeviceName)
                      setIsEditing(false)
                    }}
                    disabled={editedDeviceName === deviceName}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-lg flex-grow">{deviceName}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setEditedDeviceName(deviceName)
                      setIsEditing(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="w-full"
                onChange={() => setPersonalInfoChanged(true)}
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District Location</label>
              <Input
                id="district"
                placeholder="Enter your district"
                className="w-full"
                onChange={() => setPersonalInfoChanged(true)}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input
                id="address"
                placeholder="Enter your address"
                className="w-full"
                onChange={() => setPersonalInfoChanged(true)}
              />
            </div>
            <Button 
              onClick={() => {
                // Implement save logic here
                console.log('Saving personal information')
                setPersonalInfoChanged(false)
              }}
              disabled={!personalInfoChanged}
            >
              Save Personal Information
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy-policy" passHref>
                  <Button variant="link" className="p-0 h-auto">Privacy Policy</Button>
                </Link>
                <Link href="/terms-and-conditions" passHref>
                  <Button variant="link" className="p-0 h-auto">Terms and Conditions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Support</h3>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Get help with your device</p>
            </CardContent>
          </Card>
          
          <Button variant="destructive" onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

