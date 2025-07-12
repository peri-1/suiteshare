import { Suspense } from 'react'
import { PasswordGate } from '@/components/auth/password-gate'
import { PledgeForm } from '@/components/features/pledge-form'
import { EventSummary } from '@/components/features/event-summary'
import { Navbar } from '@/components/layout/navbar'

export default function PledgePage() {
  return (
    <PasswordGate>
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Complete Your Pledge
              </h1>
              <p className="text-gray-600">
                Secure your spot in the premium suite experience
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Suspense fallback={<div>Loading form...</div>}>
                  <PledgeForm />
                </Suspense>
              </div>
              <div>
                <Suspense fallback={<div>Loading event details...</div>}>
                  <EventSummary />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PasswordGate>
  )
}
