"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import {} from "@yandex/ymaps3-clusterer"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import IconMap from "../icons/map-svg/IconMap"

import { fromNow } from "@/helpers"
import { JSONStringBounds } from "@/utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, useBounds, useFiltersServices } from "@/store"

// type ReactifiedApi = ReactifiedModule<typeof ymaps3>

function Clusters() {
  const bounds = useBounds(({ bounds }) => bounds)
  const [reactifiedApi, setReactifiedApi] = React.useState<any>()

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(async ([{ reactify }]) => {
      const react = reactify.bindTo(React, ReactDOM)

      setReactifiedApi(react.module(ymaps3))
    })
  }, [])

  const { itemsOffers } = useMapOffers()
  const providers = useFiltersServices(({ providers }) => providers)

  const stringBounds = JSONStringBounds(bounds!)

  const is = React.useCallback(
    (value: number[]) => {
      if (!bounds) return false

      const [lon, lat] = value

      if (bounds[0][0] < lon && bounds[0][1] > lat && bounds[1][0] > lon && bounds[1][1] < lat) {
        return true
      }

      return false
    },
    [stringBounds],
  )

  if (!reactifiedApi) return null

  const { YMapMarker } = reactifiedApi ?? {}

  const marker = ({ properties, geometry }: any) => {
    const { images, title, created, provider } = (properties as unknown as IResponseOffers) ?? {}

    const offer = properties as unknown as IResponseOffers

    const image = images?.length > 0 ? images[0] : undefined

    if (Array.isArray(geometry.coordinates))
      return is(geometry.coordinates as number[]) ? (
        <YMapMarker coordinates={geometry.coordinates as any}>
          <div className="absolute w-[1.8125rem] h-9 -translate-x-1/2 -translate-y-1/2 max-md:scale-75">
            <IconMap
              provider={provider}
              image={image}
              onClick={() => {
                if (provider === EnumTypeProvider.offer) {
                  dispatchBallonOffer({ offer: offer! })
                  return
                } else if (provider === EnumTypeProvider.discussion) {
                  dispatchBallonDiscussion({ offer: offer! })
                  return
                } else if (provider === EnumTypeProvider.alert) {
                  dispatchBallonAlert({ offer: offer! })
                }
              }}
            />
            <div className="div-alert-text absolute w-max flex left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2">
              <section className="flex flex-col h-11">
                <p className="text-[#000] line-clamp-1 text-ellipsis text-sm font-medium">{title}</p>
                <time className="text-text-secondary text-[0.8125rem] font-normal leading-4">{fromNow(created ?? "")}</time>
              </section>
            </div>
          </div>
        </YMapMarker>
      ) : null

    return null
  }

  // const cluster = (coordinates: any, features: IResponseOffers[]) => (
  //   <YMapMarker coordinates={coordinates}>
  //     <div className="w-10 h-10 rounded-full bg-BG-second flex items-center justify-center">
  //       <span className="text-center text-text-primary text-sm">{features?.length}</span>
  //     </div>
  //   </YMapMarker>
  // )

  if (["all", EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(providers))
    return itemsOffers.map((item) => {
      const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

      return marker({
        type: "Feature",
        id: `${item.provider}-${item.id}`,
        geometry: {
          type: "Point",
          coordinates: coordinates as any,
        },
        properties: item as any,
      })
    })

  return null
}

Clusters.displayName = "Clusters"
export default Clusters
