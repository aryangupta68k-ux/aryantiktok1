import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ContentLockerHead } from "@/components/content-locker-head"
import "./globals.css"

const tiktokSans = localFont({
  src: "./fonts/TikTokSans.ttf",
  variable: "--font-tiktok-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TikTok for Business",
  description: "Get your business discovered on TikTok",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${tiktokSans.variable} font-sans antialiased`}>
        <ContentLockerHead />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
