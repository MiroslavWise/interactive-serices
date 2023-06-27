"use client";

import { type ReactNode } from "react";

<<<<<<< HEAD
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
=======
import { AuthProvider } from "./AuthProvider";
import { NextThemes } from "./NextThemes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemes>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextThemes>
  )
>>>>>>> b749fe3ff88a08d282e62c8a0f0fed21753aeec4
}