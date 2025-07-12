'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, DollarSign, Clock, Shield } from 'lucide-react'
import { getEventById } from '@/lib/events'
import { Event } from '@/types/events'

export function EventSummary() {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get event ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const eventId = urlParams.get('event') || 'lakers-warriors' // Default event

    const eventData = getEventById(eventId)
    setEvent(eventData || null)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading event details...</div>
        </CardContent>
      </Card>
    )
  }

  if (!event) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">Event not found</div>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'high':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-red-100 text-red-800'
    }
  }

  const getStatusText = (currentPledges: number, blocksAvailable: number) => {
    return `${currentPledges} of ${blocksAvailable} blocks pledged`
  }

  return (
    <div className="space-y-6">
      {/* Event Details Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="space-y-3">
            <div>
              <CardTitle className="text-xl leading-tight">
                {event.title}
              </CardTitle>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>
                  {event.date} at {event.time}
                </span>
              </div>
            </div>
            <div className="flex justify-start">
              <Badge className={getStatusColor(event.status)}>
                {getStatusText(event.currentPledges, event.blocksAvailable)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{event.venue}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Suite Type</p>
              <p className="text-sm text-gray-600">{event.suiteType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Suite Capacity
              </p>
              <p className="text-sm text-gray-600">
                {event.totalOccupancy} people total
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Your Block Size
              </p>
              <p className="text-sm text-gray-600">{event.blockSize} people</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Total Blocks</p>
              <p className="text-sm text-gray-600">
                {event.blocksAvailable} blocks
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {event.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Breakdown Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Pricing Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm text-gray-600">Total Suite Price</span>
                <p className="text-xs text-gray-500">
                  ({event.totalOccupancy} people)
                </p>
              </div>
              <span className="font-medium">
                ${event.totalSuitePrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div>
                <span className="text-sm text-gray-600">Block Price</span>
                <p className="text-xs text-gray-500">
                  ({event.blockSize} people)
                </p>
              </div>
              <span className="font-medium">
                ${event.blockPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
              <div>
                <span className="text-sm font-medium text-blue-900">
                  Your Pledge Amount
                </span>
                <p className="text-xs text-blue-700">(20% of block price)</p>
              </div>
              <span className="text-xl font-bold text-blue-600">
                ${event.pledgeAmount}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm text-gray-600">Cost Per Person</span>
                <p className="text-xs text-gray-500">(in your block)</p>
              </div>
              <span className="font-medium">
                ${event.pricePerPerson.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Submit Your Pledge</p>
                <p className="text-xs text-gray-600">
                  Reserve your block with a 20% pledge
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-sm font-medium">We Fill All Blocks</p>
                <p className="text-xs text-gray-600">
                  Wait for all {event.blocksAvailable} blocks to get pledgers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Complete Payment</p>
                <p className="text-xs text-gray-600">
                  Pay remaining 80% when entire suite fills (7 days before
                  event)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust & Safety Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Trust & Safety
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Full refund if entire suite doesn&apos;t fill
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Background-checked members only
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Secure payment processing
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              24/7 customer support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
