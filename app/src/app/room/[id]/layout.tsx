import CodeDialog from '@/components/CodeDialog'
import SocketContextProvider from '@/components/providers/SocketContextProvider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketContextProvider>
      {children}
      <CodeDialog />
    </SocketContextProvider>
  )
}
