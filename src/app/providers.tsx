"use client"

import { type ReactNode, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
import { SessionProvider } from "next-auth/react"

import { useAuth } from "@/store/hooks/useAuth"

import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  }
})

export function Providers({ children }: { children: ReactNode }) {
  const { changeAuth } = useAuth()
  useEffect(() => {
    changeAuth()
  }, [changeAuth])
  return (
    <NextThemesProvider>
      <QueryClientProvider client={queryClient}>
        <YMapsProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
          <ToastContainer />
        </YMapsProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}