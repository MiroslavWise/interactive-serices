"use client"

import { type ReactNode } from "react"
import { YMaps } from "@pbe/react-yandex-maps"

export const YMapsProvider = ({ children }: { children: ReactNode }) => {
        
        return (
                <YMaps>
                        {children}
                </YMaps>
        )
}