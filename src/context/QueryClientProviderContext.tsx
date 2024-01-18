"use client"

import { type ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retryDelay: 2.5 * 1000,
            retry(_, error) {
                console.warn("--ERROR QUERY CLIENT--- ", error)
                return true
            },
            staleTime: 60 * 1000,
            gcTime: 300 * 1000,
        },
    },
})

export const QueryClientProviderContext = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
