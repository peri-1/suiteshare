export interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  suiteType: string
  blockSize: number
  totalPrice: number
  pricePerPerson: number
  pledgeAmount: number
  blocksAvailable: number
  currentPledges: number
  amenities: string[]
  status: 'high' | 'medium' | 'low'
  isActive: boolean
}
