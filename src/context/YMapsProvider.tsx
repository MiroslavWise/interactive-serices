"use client"

import { YMaps } from "@pbe/react-yandex-maps"

import env from "@/config/environment"

export function YMapsProvider({ children }: { children: React.ReactNode }) {
  return (
    <YMaps
      query={{
        apikey: env.api_key_yandex,
        lang: "ru_RU",
        coordorder: "longlat",
        mode: "release",
      }}
      preload={false}
    >
      {children}
    </YMaps>
  )
}
