import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { UserContextProvider } from '@/components/providers/UserContextProvider'
import { RoomContextProvider } from '@/components/providers/RoomContextProvider'
import { SecretcodeContextProvider } from '@/components/providers/SecretcodeContextProvider'
import SocketContextProvider from '@/components/providers/SocketContextProvider'


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
          <SocketContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
            >
              <RoomContextProvider>
                <UserContextProvider>
                  <SecretcodeContextProvider>
                    {children}
                  </SecretcodeContextProvider>
                </UserContextProvider>
              </RoomContextProvider>
            </ThemeProvider>
          </SocketContextProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
