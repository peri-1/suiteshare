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
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                {event.date} at {event.time}
              </div>
            </div>
            <Badge className={getStatusColor(event.status)}>
              {getStatusText(event.currentPledges, event.blocksAvailable)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {event.venue}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Suite Type</p>
              <p className="text-sm text-gray-600">{event.suiteType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Block Size</p>
              <p className="text-sm text-gray-600">{event.blockSize} people</p>
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
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">Total Suite Price</span>
              <span className="font-medium">
                ${event.totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">Price Per Person</span>
              <span className="font-medium">
                ${event.pricePerPerson.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 bg-blue-50 px-3 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                Your Pledge Amount (20%)
              </span>
              <span className="text-lg font-bold text-blue-600">
                ${event.pledgeAmount}
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
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Submit Your Interest</p>
                <p className="text-xs text-gray-600">
                  Complete this form to join the suite block
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                2
              </div>
              <div>
                <p className="text-sm font-medium">We Match You</p>
                <p className="text-xs text-gray-600">
                  Connect with like-minded fans in your suite
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Complete Payment</p>
                <p className="text-xs text-gray-600">
                  Pay when your block fills (7 days before event)
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
              Full refund if block doesn&apos;t fill
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
