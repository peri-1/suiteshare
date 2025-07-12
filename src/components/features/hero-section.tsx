import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Shield, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Zap className="h-4 w-4" />
            Now Live in Los Angeles
          </div>
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Share Premium Suites,{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Split Premium Costs
          </span>
        </h1>

        <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
          Experience luxury sports viewing by sharing private suites with
          like-minded fans. Pay only for your portion, enjoy the full premium
          experience.
        </p>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Available Suites
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            How It Works
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <Users className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold">Verified Fans</h3>
            <p className="text-sm text-gray-600">
              Background-checked members only
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Full refund if suite doesn&apos;t fill
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold">Instant Matching</h3>
            <p className="text-sm text-gray-600">
              Connect with fans in 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
