'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, DollarSign } from 'lucide-react'
import { getAllEvents } from '@/lib/events'
import { Event } from '@/types/events'

export function EventsTable() {
  const events = getAllEvents()

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

  const handlePledgeClick = (eventId: string) => {
    // Navigate to pledge page with event ID
    window.location.href = `/pledge?event=${eventId}`
  }

  return (
    <section id="available-events" className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Available Suite Experiences
        </h2>
        <p className="text-lg text-gray-600">
          Premium suites at unbeatable prices through shared experiences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {event.date} at {event.time}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(event.status)}>
                  {getStatusText(event.currentPledges, event.blocksAvailable)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {event.venue}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Suite Type
                    </p>
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
                      Block Size
                    </p>
                    <p className="text-sm text-gray-600">
                      {event.blockSize} people
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Blocks Available
                    </p>
                    <p className="text-sm text-gray-600">
                      {event.blocksAvailable} blocks
                    </p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Suite Price</span>
                    <span className="font-medium">
                      ${event.totalSuitePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Block Price</span>
                    <span className="font-medium">
                      ${event.blockPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-900">
                      Your Pledge (20%)
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ${event.pledgeAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Per Person</span>
                    <span className="font-medium">
                      ${event.pricePerPerson.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePledgeClick(event.id)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pledge ${event.pledgeAmount} Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
