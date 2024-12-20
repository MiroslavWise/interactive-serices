"use client"

import { type PropsWithChildren } from "react"

import { YMaps } from "@pbe/react-yandex-maps"

import env from "@/config/environment"

function YMapsProvider({ children }: PropsWithChildren) {
  // return children

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
