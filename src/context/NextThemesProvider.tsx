"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "next-themes"

export const NextThemesProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="data-theme">{children}</ThemeProvider>
)
