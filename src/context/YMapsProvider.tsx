"use client"

import { type ReactNode } from "react"
// import { YMaps } from "@pbe/react-yandex-maps"

// import env from "@/config/environment"

export const YMapsProvider = ({ children }: { children: ReactNode }) => {
    return children
    // return (
    //     <YMaps
    //         query={{
    //             apikey: env.api_key_yandex,
    //             lang: "ru_RU",
    //         }}
    //         preload={false}
    //     >
    //         {children}
    //     </YMaps>
    // )
}
