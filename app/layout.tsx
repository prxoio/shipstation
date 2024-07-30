import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Footer from '@/components/footer' // Import the Footer component

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ShipStation by Manufi™',
  description: 'Centralised order management for distributed e-commerce brands',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-muted/40">
            <TooltipProvider>
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-col w-full sm:gap-4 sm:py-4 sm:pl-14 flex-1">
                  <Header />
                  <main className="flex-1">{children}</main>
                </div>
              </div>
            </TooltipProvider>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}