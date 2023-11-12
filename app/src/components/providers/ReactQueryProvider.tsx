"use client"

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

type Props = {
    children: React.ReactNode
}

export default function ReactQueryProvider({ children }: Props) {
    // Create a client
    const queryClient = new QueryClient()
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
