import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { UserContextProvider } from '@/components/providers/UserContext'
import { RoomContextProvider } from '@/components/providers/RoomContext'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'


export const metadata: Metadata = {
  title: "Meet",
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
              <UserContextProvider>
                {children}
              </UserContextProvider>
            </RoomContextProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
