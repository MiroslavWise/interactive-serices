"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { dispatchBounds, dispatchMapCoordinates, useMapCoordinates } from "@/store"
import { YMapLocationRequest } from "ymaps3"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify/reactify"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>

import Clusters from "@/components/YandexMap/Clusters"
import { useTheme } from "next-themes"
import { clg } from "@console"

const COORD = [37.427698, 55.725864]

export default () => {
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const { systemTheme } = useTheme()
  const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()

  React.useEffect(() => {
    ymaps3.ready.then(() => {
      ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", "@yandex/ymaps3-clusterer@0.0")
    })

    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(async ([{ reactify }]) => {
      setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
    })
  }, [])

  if (!reactifiedApi) return null

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener } = reactifiedApi ?? {}

  return (
    <YMap
      className="w-full h-full"
      location={
        {
          center: coordinates || COORD,
          zoom: zoom,
        } as YMapLocationRequest
      }
      theme={systemTheme}
    >
      <Clusters />
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapListener
        onActionEnd={(event) => {
          const { location } = event ?? {}
          const { bounds, center, zoom } = location ?? {}

          dispatchMapCoordinates({
            coordinates: center as number[],
            zoom: zoom,
          })
          dispatchBounds(bounds)

          clg("YMapListener onActionEnd", event)
        }}
      />
    </YMap>
  )
}
