"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { EnumTypeProvider } from "@/types/enum"

import IconMap from "../icons/map-svg/IconMap"

import { fromNow } from "@/helpers"
import { JSONStringBounds } from "@/utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, useBounds, useFiltersServices } from "@/store"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>

function Clusters() {
  const bounds = useBounds(({ bounds }) => bounds)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(async ([{ reactify }]) => {
      setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
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

  if (["all", EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(providers))
    return itemsOffers.map((item) => {
      const { images, id, addresses, title, created } = item ?? {}
      const coordinates = addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_))

      const image = images.length > 0 ? images[0] : undefined

      if (Array.isArray(coordinates))
        return is(coordinates) ? (
          <YMapMarker coordinates={coordinates as any} key={`:dfs:gfg:adas:-${id}`}>
            <div className="absolute w-[1.8125rem] h-9 -translate-x-1/2 -translate-y-1/2 max-md:scale-75">
              <IconMap
                provider={item.provider}
                image={image}
                onClick={() => {
                  if (item?.provider === EnumTypeProvider.offer) {
                    dispatchBallonOffer({ offer: item! })
                    return
                  } else if (item?.provider === EnumTypeProvider.discussion) {
                    dispatchBallonDiscussion({ offer: item! })
                    return
                  } else if (item?.provider === EnumTypeProvider.alert) {
                    dispatchBallonAlert({ offer: item! })
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
    })

  return null
}

Clusters.displayName = "Clusters"
export default React.memo(Clusters)
