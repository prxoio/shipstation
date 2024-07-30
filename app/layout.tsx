import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ShipStation by Manufi',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <TooltipProvider>
              <Sidebar />
              <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <Header />

                {children}
              </div>
            </TooltipProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
