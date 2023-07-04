"use client"

import { type ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from 'react-query'

import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
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