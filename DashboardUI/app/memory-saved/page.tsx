'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const memories = [
  {
    id: 1,
    image: '/placeholder.svg?height=100&width=100',
    text: 'Beautiful sunset at Phewa Lake',
    location: 'Pokhara, Nepal',
    phoneNumbers: ['9841234567', '9851234567'],
    persons: [
      { name: 'Aarav Sharma', identification: 'Friend' },
      { name: 'Sita Thapa', identification: 'Tour Guide' }
    ]
  },
  {
    id: 2,
    image: '/placeholder.svg?height=100&width=100',
    text: 'Trekking in the Annapurna region',
    location: 'Annapurna, Nepal',
    phoneNumbers: ['9861234567'],
    persons: [
      { name: 'Bijay Gurung', identification: 'Trekking Partner' }
    ]
  },
  {
    id: 3,
    image: '/placeholder.svg?height=100&width=100',
    text: 'Visit to Pashupatinath Temple',
    location: 'Kathmandu, Nepal',
    phoneNumbers: ['9871234567', '9881234567'],
    persons: [
      { name: 'Priya Shrestha', identification: 'Family Member' },
      { name: 'Ram Adhikari', identification: 'Temple Guide' }
    ]
  }
]

export default function MemorySavedPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Memory Saved</CardTitle>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memories.map((memory) => (
              <Card key={memory.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image src={memory.image} alt={memory.text} width={100} height={100} className="rounded-md" />
                    <div>
                      <p className="font-semibold">{memory.text}</p>
                      <p className="text-sm text-gray-500">{memory.location}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Phone Numbers:</h4>
                    <ul className="list-disc list-inside">
                      {memory.phoneNumbers.map((phone, index) => (
                        <li key={index}>{phone}</li>
                      ))}
                    </ul>
                    <h4 className="font-semibold">Persons:</h4>
                    <ul className="list-disc list-inside">
                      {memory.persons.map((person, index) => (
                        <li key={index}>{person.name} - {person.identification}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

