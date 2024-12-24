"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useTheme } from "next-themes"
import { LngLat, YMapHotspot } from "ymaps3"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { clg } from "@console"
import { useStatusAuth } from "@/helpers/use-status-auth"
import {
  dispatchAuthModal,
  dispatchBounds,
  dispatchMapCoordinates,
  dispatchNewServicesBannerMap,
  EStatusAuth,
  useMapCoordinates,
} from "@/store"
import { EnumSign } from "@/types/enum"
import { useToast } from "@/helpers/hooks/useToast"
import { getAddressCoords } from "@/helpers/get-address"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>

function ContextMap({ children }: React.PropsWithChildren) {
  const { on } = useToast()
  const { systemTheme } = useTheme()
  const statusAuth = useStatusAuth()
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()

  async function menuAddress(values: LngLat) {
    if (statusAuth !== EStatusAuth.AUTHORIZED) {
      dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
      on({ message: "Вы не можете создать услугу и беседу, пока не войдёте или не зарегистрируетесь на нашем сервисе" })
      return
    }
    if (values) {
      const [lon, lat] = values

      const response = await getAddressCoords({ mapOne: lon, mapTwo: lat })
      if (response) {
        console.log("response: ", response)
        dispatchNewServicesBannerMap(response)
      }
    }
  }

  React.useEffect(() => {
    Promise.all([ymaps3?.import("@yandex/ymaps3-reactify"), ymaps3?.ready]).then(([{ reactify }]) => {
      if (reactify) {
        const react = reactify.bindTo(React, ReactDOM)
        setReactifiedApi(react.module(ymaps3))
        ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", "@yandex/ymaps3-clusterer@0.0.1")
      }
    })
  }, [])

  if (!reactifiedApi) return null

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener } = reactifiedApi ?? {}

  return (
    <YMap
      className="w-full h-full"
      location={
        {
          center: coordinates,
          zoom: zoom,
        } as any
      }
      theme={systemTheme}
      zoomRange={{
        min: 6,
        max: 20,
      }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {children}
      <YMapListener
        onActionEnd={(event) => {
          const { location } = event ?? {}
          const { bounds, center, zoom } = location ?? {}
          dispatchMapCoordinates({
            coordinates: center as number[],
            zoom: zoom,
          })
          dispatchBounds(bounds)
        }}
        onDblClick={(event) => {
          clg("onContextMenu: ", event)
          const { entity } = event ?? {}
          const { geometry } = (entity ?? {}) as YMapHotspot
          if (geometry) {
            const { coordinates } = geometry ?? {}
            menuAddress(coordinates as LngLat)
          }
        }}
        onContextMenu={(event) => {
          clg("onContextMenu: ", event)
          const { entity } = event ?? {}
          const { geometry } = (entity ?? {}) as YMapHotspot
          if (geometry) {
            const { coordinates } = geometry ?? {}
            menuAddress(coordinates as LngLat)
          }
        }}
      />
    </YMap>
  )
}

ContextMap.displayName = "ContextMap"
export default ContextMap
