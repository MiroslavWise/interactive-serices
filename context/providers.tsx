'use client'

import { type ReactNode } from "react"

import { AuthProvider } from "./AuthProvider"
import { NextThemes } from "./NextThemes"
import { YMapsProvider } from "./YMapsProvider"

export function Providers({ children }: { children: ReactNode }) {

        return (
                <NextThemes>
                        <AuthProvider>
                                <YMapsProvider>
                                        {children}
                                </YMapsProvider>
                        </AuthProvider>
                </NextThemes>
        )
}