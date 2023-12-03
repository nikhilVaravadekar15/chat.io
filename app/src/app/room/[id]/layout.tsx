import SetSecretCodeDialog from '@/components/SetSecretCodeDialog'
import { UserContextProvider } from '@/components/providers/UserContextProvider'
import SocketContextProvider from '@/components/providers/SocketContextProvider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketContextProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
      <SetSecretCodeDialog />
    </SocketContextProvider>
  )
}
