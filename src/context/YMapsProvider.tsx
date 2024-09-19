"use client"

import { YMaps } from "@pbe/react-yandex-maps"

import env from "@/config/environment"

function YMapsProvider({ children }: { children: React.ReactNode }) {
  return (
    <YMaps
      query={{
        apikey: env.api_key_yandex,
        lang: "ru_RU",
        coordorder: "longlat",
        mode: "release",
      }}
      preload={true}
    >
      {children}
    </YMaps>
  )
}

YMapsProvider.displayName = "YMapsProvider"
export default YMapsProvider
