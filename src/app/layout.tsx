import DefaultLayout from '@/layout/DefaultLayout'
import { theme } from '@/theme/theme'
import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--plus-jakarta-sans',
})

export const metadata: Metadata = {
  title: 'EBuddy Technical Test',
  description: 'EBuddy Technical Test',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${plusJakartaSans.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DefaultLayout>{children}</DefaultLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
