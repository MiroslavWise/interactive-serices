"use client"

import { type ReactNode } from "react"

import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider>
        <YMapsProvider>
          {children}
        </YMapsProvider>
    </NextThemesProvider>
  )
}