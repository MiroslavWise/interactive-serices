"use client"

import { type ReactNode, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"

// import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

import { useAuth } from "@/store/hooks/useAuth"
import { yandex } from "@/lib/yandex"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    }
  }
})

export default function Providers({ children }: { children: ReactNode }) {
  const { changeAuth } = useAuth()
  useEffect(() => {
    changeAuth()
    yandex()
  }, [changeAuth])

  return (
    // <NextThemesProvider>
      <QueryClientProvider client={queryClient}>
        <YMapsProvider>
          {children}
          <ToastContainer />
        </YMapsProvider>
      </QueryClientProvider>
    // </NextThemesProvider>
  )
}