'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, User, Mail } from 'lucide-react'
import { getEventById } from '@/lib/events'

// Updated form validation schema
const pledgeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  fanPreference: z.string().min(1, 'Please select team preference'),
  ageRange: z.string().min(1, 'Please select age range'),
  hearAboutUs: z.string().min(1, 'Please tell us how you heard about us'),
})

type PledgeFormData = z.infer<typeof pledgeSchema>

export function PledgeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventId, setEventId] = useState<string | null>(null)
  const [event, setEvent] = useState<Event | null>(null)

  const form = useForm<PledgeFormData>({
    resolver: zodResolver(pledgeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      fanPreference: '',
      ageRange: '',
      hearAboutUs: '',
    },
  })

  // Get event ID and details from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const eventParam = urlParams.get('event')
    const eventData = getEventById(eventParam || 'lakers-warriors')
    setEventId(eventParam || 'lakers-warriors')
    setEvent(eventData)
  }, [])

  // Get team options based on the specific game
  const getTeamOptions = () => {
    if (!event) return []

    const gameTitle = event.title.toLowerCase()
    const teams = []

    if (gameTitle.includes('lakers'))
      teams.push({ value: 'lakers', label: 'Lakers Fan' })
    if (gameTitle.includes('warriors'))
      teams.push({ value: 'warriors', label: 'Warriors Fan' })
    if (gameTitle.includes('celtics'))
      teams.push({ value: 'celtics', label: 'Celtics Fan' })
    if (gameTitle.includes('nuggets'))
      teams.push({ value: 'nuggets', label: 'Nuggets Fan' })

    teams.push({ value: 'neutral', label: 'Neutral/Just for Fun' })

    return teams
  }

  const onSubmit = async (data: PledgeFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate form submission (in Slice 3 we'll add real backend)
      const submissionData = {
        ...data,
        eventId,
        blockSize: event?.blockSize || 5, // Include block size for context
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }

      // Store in localStorage for now (replace with real backend in Slice 3)
      const existingSubmissions = JSON.parse(
        localStorage.getItem('pledgeSubmissions') || '[]'
      )
      existingSubmissions.push(submissionData)
      localStorage.setItem(
        'pledgeSubmissions',
        JSON.stringify(existingSubmissions)
      )

      // Log to console for development tracking
      console.log('Pledge form submitted:', submissionData)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to confirmation page
      window.location.href = '/confirmation'
    } catch (error) {
      console.error('Pledge submission failed:', error)
      // In a real app, we'd show an error message to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  const teamOptions = getTeamOptions()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Your Information
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tell us about yourself to help us create the best suite experience
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Personal Details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Game Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Game Preferences
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fanPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Preference *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamOptions.map((team) => (
                            <SelectItem key={team.value} value={team.value}>
                              {team.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ageRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age Range *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46-55">46-55</SelectItem>
                          <SelectItem value="55+">55+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Additional Information
              </h3>

              <FormField
                control={form.control}
                name="hearAboutUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about SuiteShare? *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="word-of-mouth">
                          Word of mouth
                        </SelectItem>
                        <SelectItem value="social-media">
                          Social media
                        </SelectItem>
                        <SelectItem value="google-search">
                          Google search
                        </SelectItem>
                        <SelectItem value="referral">
                          Referral from friend
                        </SelectItem>
                        <SelectItem value="beta-invite">
                          Beta testing invite
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms and Submit */}
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="font-medium text-blue-900">
                  Block Pledge Information
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  You&apos;re pledging for a block of {event?.blockSize || 5}{' '}
                  people. We&apos;ll match you with other fans to complete your
                  block. Payment is only processed when the entire suite fills
                  up.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Your Block Pledge...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Submit Block Pledge
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
