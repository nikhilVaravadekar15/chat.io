import './globals.css'
import type { Metadata } from 'next'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'


export const metadata: Metadata = {
  title: "Zoomincognito",
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
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
