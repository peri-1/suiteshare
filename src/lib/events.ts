import { Event } from '@/types/events'
import eventsData from '@/data/events.json'

export function getAllEvents(): Event[] {
  return eventsData.filter((event) => event.isActive)
}

export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id && event.isActive)
}

export function getEventsByStatus(status: Event['status']): Event[] {
  return eventsData.filter((event) => event.status === status && event.isActive)
}
