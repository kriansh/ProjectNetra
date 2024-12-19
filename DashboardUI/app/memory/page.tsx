'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from 'lucide-react'

// Mock data for existing memories
const existingMemories = [
  { id: 1, name: 'John Doe', image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Jane Smith', image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Alice Johnson', image: '/placeholder.svg?height=200&width=200' },
]

export default function MemoryPage() {
  
  const router = useRouter()
  const [newMemoryName, setNewMemoryName] = useState('')
  const [newMemoryImage, setNewMemoryImage] = useState<File | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMemoryImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the image upload and data submission
    console.log('Submitting new memory:', { name: newMemoryName, image: newMemoryImage })
    // Reset form
    setNewMemoryName('')
    setNewMemoryImage(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Memories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {existingMemories.map((memory) => (
              <Card key={memory.id}>
                <CardContent className="p-4">
                  <Image
                    src={memory.image}
                    alt={memory.name}
                    width={200}
                    height={200}
                    className="rounded-md mb-2"
                  />
                  <p className="text-center font-semibold">{memory.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newMemoryName}
                    onChange={(e) => setNewMemoryName(e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      required
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                    <span className="text-sm text-gray-500">
                      {newMemoryImage ? newMemoryImage.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <Button type="submit">Add Memory</Button>
              </form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

