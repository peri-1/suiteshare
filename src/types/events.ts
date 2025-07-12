export interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  suiteType: string
  totalOccupancy: number // Total people the suite can hold
  blockSize: number // People per block
  totalSuitePrice: number // Total cost of entire suite
  blockPrice: number // Cost per block (totalSuitePrice / blocksAvailable)
  pledgeAmount: number // 20% of blockPrice
  pricePerPerson: number // blockPrice / blockSize
  blocksAvailable: number // Number of blocks (totalOccupancy / blockSize)
  currentPledges: number
  amenities: string[]
  status: 'high' | 'medium' | 'low'
  isActive: boolean
}
