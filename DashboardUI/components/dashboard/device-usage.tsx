'use client'

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { name: 'Mon', Reading: 4, Navigation: 3 },
  { name: 'Tue', Reading: 3, Navigation: 4 },
  { name: 'Wed', Reading: 5, Navigation: 2 },
  { name: 'Thu', Reading: 2, Navigation: 5 },
  { name: 'Fri', Reading: 3, Navigation: 3 },
  { name: 'Sat', Reading: 4, Navigation: 2 },
  { name: 'Sun', Reading: 3, Navigation: 4 },
]

export function DeviceUsage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Device Usage Analytics</CardTitle>
            <CardDescription>Track your device usage patterns</CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                    </>
                  ) : (
                    format(date.from, "LLL dd")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <div className="grid gap-1">
              <h3 className="font-semibold">Usage Statistics</h3>
              <div className="grid gap-4 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-pink-500" />
                    <span className="text-sm font-medium">Reading</span>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours 30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Navigation</span>
                  </div>
                  <span className="text-sm text-muted-foreground">1 hour 45 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                    <span className="text-sm font-medium">Other</span>
                  </div>
                  <span className="text-sm text-muted-foreground">45 minutes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid gap-1">
              <h3 className="font-semibold">Total Usage</h3>
              <div className="text-2xl font-bold">5 hours</div>
              <p className="text-xs text-muted-foreground">
                +20% from last week
              </p>
            </div>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="Reading" fill="hsl(322.7 65.1% 54.9%)" radius={[4, 4, 0, 0]} /> {/* Pink */}
              <Bar dataKey="Navigation" fill="hsl(217.2 91.2% 59.8%)" radius={[4, 4, 0, 0]} /> {/* Blue */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

