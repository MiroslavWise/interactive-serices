"use client"

import { type ReactNode } from "react"
import { YMaps } from "@pbe/react-yandex-maps"

import env from "@/config/environment"

export function YMapsProvider({ children }: { children: ReactNode }) {
    return (
        <YMaps
            query={{
                apikey: env.api_key_yandex,
                lang: "ru_RU",
                mode: "release",
            }}
            preload={false}
        >
            {children}
        </YMaps>
    )
}
