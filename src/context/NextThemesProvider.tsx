"use client"

import { type PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"

export const NextThemesProvider = ({ children }: PropsWithChildren) => <ThemeProvider attribute="data-theme">{children}</ThemeProvider>
