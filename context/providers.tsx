"use client";

import { type ReactNode } from "react";

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
}