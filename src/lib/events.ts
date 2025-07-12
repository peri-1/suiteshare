import { Event } from '@/types/events'
import eventsData from '@/data/events.json'

// Type assertion to ensure the imported data matches our Event interface
const typedEventsData = eventsData as Event[]

export function getAllEvents(): Event[] {
  return typedEventsData.filter((event) => event.isActive)
}

export function getEventById(id: string): Event | undefined {
  return typedEventsData.find((event) => event.id === id && event.isActive)
}

export function getEventsByStatus(status: Event['status']): Event[] {
  return typedEventsData.filter(
    (event) => event.status === status && event.isActive
  )
}
