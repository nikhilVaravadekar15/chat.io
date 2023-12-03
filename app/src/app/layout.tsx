import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { RoomContextProvider } from '@/components/providers/RoomContextProvider'
import { SecretcodeContextProvider } from '@/components/providers/SecretcodeContextProvider'


export const metadata: Metadata = {
  title: "skibble",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <RoomContextProvider>
              <SecretcodeContextProvider>
                {children}
              </SecretcodeContextProvider>
            </RoomContextProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
