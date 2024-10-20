import { Inter } from 'next/font/google'

import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

import '@/styles/globals.css'
import Providers from './Providers'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'cherrydub | Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <Providers>
          <main className='min-h-screen flex flex-col items-center'>
            <div className='flex-1 w-full flex flex-col gap-20 items-center'>
              <Header />
              <div className='flex flex-1 flex-col max-w-5xl p-5'>
                {children}
              </div>
              <Footer />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
