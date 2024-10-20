'use client'

import { useEffect } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logMessageAction } from '@/app/actions'

// TODO: Add more error types as needed
// for the middleware errors, send a log to the server/db or send email to the admin. This is a type of catchall

const MessageWrapper = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Get the message from URL
    const error = searchParams.get('error')
    const toasty = searchParams.get('toasty')
    const clientError = searchParams.get('clientError')
    const middleware = searchParams.get('middleware')

    const logMessageWrapper = async (
      message: string,
      type: 'error' | 'info' | 'clientError' | 'middleware'
    ) => {
      await logMessageAction(message, type)
    }

    // Keeping the commented out API request for reference
    const logMessageviaAPI = async (
      message: string,
      type: 'error' | 'info' | 'clientError'
    ) => {
      try {
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: 'api:' + message, type })
        })
      } catch (error) {
        console.error('Failed to log message:', error)
      }
    }

    if (toasty) {
      toast.info('toasty: ' + toasty)
      logMessageWrapper(toasty, 'info')

      const url = new URL(window.location.href)
      url.searchParams.delete('toasty')
      router.replace(url.pathname + url.search)
    }

    if (clientError) {
      toast.error('clientError: ' + clientError)
      // logMessageWrapper(clientError, 'clientError')
      logMessageviaAPI(clientError, 'clientError')

      const url = new URL(window.location.href)
      url.searchParams.delete('clientError')
      router.replace(url.pathname + url.search)
    }

    if (error) {
      toast.error('error: ' + error)
      logMessageWrapper(error, 'error')

      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      router.replace(url.pathname + url.search)
    }

    if (middleware) {
      toast.error('middleware: ' + middleware)
      logMessageWrapper(middleware, 'middleware')

      const url = new URL(window.location.href)
      url.searchParams.delete('middleware')
      router.replace(url.pathname + url.search)
    }
  }, [searchParams, router])

  return <>{children}</>
}

export default MessageWrapper
