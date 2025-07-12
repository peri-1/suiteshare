import { PasswordGate } from '@/components/auth/password-gate'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Shield, Mail } from 'lucide-react'
import Link from 'next/link'

export default function ConfirmationPage() {
  return (
    <PasswordGate>
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Pledge Intent Submitted!
                </CardTitle>
                <p className="text-gray-600">
                  Thank you for your interest! We&apos;ve received your
                  information and you&apos;re now in our system.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Confirmation Email</h3>
                      <p className="text-sm text-gray-600">
                        You&apos;ll receive a confirmation email within 5
                        minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">What&apos;s Next</h3>
                      <p className="text-sm text-gray-600">
                        We&apos;ll contact you when your suite block fills up
                        (usually within 2-3 days)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Payment & Details</h3>
                      <p className="text-sm text-gray-600">
                        Final payment and suite details will be shared 7 days
                        before the event
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This is Slice 2 - we&apos;re
                    collecting pledge intent data. Payment processing will be
                    added in the next development phase.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/">View More Events</Link>
                  </Button>

                  <p className="text-sm text-gray-500">
                    Questions? Email us at{' '}
                    <a
                      href="mailto:support@suiteshare.net"
                      className="text-blue-600 hover:underline"
                    >
                      support@suiteshare.net
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </PasswordGate>
  )
}
