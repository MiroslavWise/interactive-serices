"use client"

import { type ReactNode, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"


import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

import env from "@/config/environment"

import { useAuth } from "@/store/hooks/useAuth"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  }
})

export default function Providers({ children }: { children: ReactNode }) {
  const { changeAuth } = useAuth()
  useEffect(() => {
    changeAuth()
  }, [changeAuth])
  useEffect(() => {
    console.log("env: ", env)
  }, [])
  return (
    <NextThemesProvider>
      <QueryClientProvider client={queryClient}>
        <YMapsProvider>
          {children}
          <ToastContainer />
        </YMapsProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}