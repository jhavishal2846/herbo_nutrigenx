import type { Metadata } from 'next'
import './globals.css'
import { Fraunces, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Herbo Nutrigenx',
    default: 'Herbo Nutrigenx — Wellness, Nutrition & Cellular Health',
  },
  description:
    'Herbo Nutrigenx is an evidence-based wellness library. Explore science-backed articles on nutrition, immunity, sleep, mental wellbeing, fitness and cellular health.',
  keywords: [
    'herbal wellness',
    'nutrition education',
    'cellular health',
    'immune health',
    'mental wellness',
    'gut health',
    'science-backed wellness',
  ],
  metadataBase: new URL('https://herbonutrigenx.com'),
  openGraph: {
    type: 'website',
    siteName: 'Herbo Nutrigenx',
    locale: 'en_US',
    title: 'Herbo Nutrigenx — Wellness, Nutrition & Cellular Health',
    description:
      'A science-led library on herbal wellness, nutrition, immunity, mental wellbeing and cellular health.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`h-full scroll-smooth antialiased ${fraunces.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-bg text-ink font-sans"
      >
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
