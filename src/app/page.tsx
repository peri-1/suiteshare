import { HeroSection } from '@/components/features/hero-section'
import { HowItWorks } from '@/components/features/how-it-works'
import { EventsTable } from '@/components/features/events-table'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <EventsTable />
      <Footer />
    </main>
  )
}
