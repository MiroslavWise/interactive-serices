"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useTheme } from "next-themes"
// import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { dispatchBounds, dispatchMapCoordinates, useMapCoordinates } from "@/store"
import { clg } from "@console"

// type ReactifiedApi = ReactifiedModule<typeof ymaps3>

const COORD = [37.427698, 55.725864]

function ContextMap({ children }: React.PropsWithChildren) {
  const { systemTheme } = useTheme()
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
  const [reactifiedApi, setReactifiedApi] = React.useState<any>()

  React.useEffect(() => {
    const script = document.getElementById("yandex-3-0")

    if (script) {
      script.onload = function (event) {
        clg("script event: ", event)
      }
    }

    Promise.all([ymaps3?.import("@yandex/ymaps3-reactify"), ymaps3?.ready]).then(([{ reactify }]) => {
      if (reactify) {
        const react = reactify.bindTo(React, ReactDOM)
        // const cluster = react.module(await ymaps3.import("@yandex/ymaps3-clusterer"))
        setReactifiedApi(react.module(ymaps3))
        ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", "@yandex/ymaps3-clusterer@0.0")
      }
    })
  }, [])

  clg("reactifiedApi: ", reactifiedApi)

  if (!reactifiedApi) return children

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener } = reactifiedApi ?? {}

  return (
    <YMap
      className="w-full h-full"
      location={
        {
          center: coordinates || COORD,
          zoom: zoom,
        } as any
      }
      theme={systemTheme}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {children}
      <YMapListener
        onActionEnd={(event: any) => {
          const { location } = event ?? {}
          const { bounds, center, zoom } = location ?? {}
          dispatchMapCoordinates({
            coordinates: center as number[],
            zoom: zoom,
          })
          dispatchBounds(bounds)
        }}
      />
    </YMap>
  )
}

ContextMap.displayName = "ContextMap"
export default ContextMap
