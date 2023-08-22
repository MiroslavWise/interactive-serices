"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "next-themes"

export const NextThemesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="data-theme">
      {children}
    </ThemeProvider>
  )
}