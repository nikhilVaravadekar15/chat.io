import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Incognito-rtc",
  icons: {
    icon: [
      "/favicon.png"
    ],
    apple: [
      "/apple-icon.png"
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
