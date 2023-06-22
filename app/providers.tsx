'use client'

import { type ReactNode } from "react"

import { NextThemes } from "context"

export default function Providers({ children }: { children: ReactNode }) {
        
        return (
                <NextThemes>
                        {children}
                </NextThemes>
        )
}