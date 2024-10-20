import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import MessageWrapper from '@/components/MessageWrapper'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <MessageWrapper>
      <Toaster richColors />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </MessageWrapper>
  )
}
