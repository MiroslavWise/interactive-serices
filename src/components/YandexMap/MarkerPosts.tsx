"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useQuery } from "@tanstack/react-query"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { EnumTypeProvider } from "@/types/enum"

import IconMap from "../icons/map-svg/IconMap"

import { fromNow } from "@/helpers"
import { getPosts } from "@/services/posts"
import { JSONStringBounds } from "@/utils/map-sort"
import { dispatchBallonPost, useBounds, useFiltersServices, useUrgentFilter } from "@/store"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>

function MarkerPosts() {
  const bounds = useBounds(({ bounds }) => bounds)
  const urgent = useUrgentFilter(({ urgent }) => urgent)
  const providers = useFiltersServices(({ providers }) => providers)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(async ([{ reactify }]) => {
      const react = reactify.bindTo(React, ReactDOM)

      setReactifiedApi(react.module(ymaps3))
    })
  }, [])

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    select: (data) => data?.data?.filter((item) => (!!urgent ? !!item.urgent : true)),
  })

  const list = data ?? []

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

  if (["all", EnumTypeProvider.POST].includes(providers))
    return list.map((item) => {
      const { addresses, title, created } = item ?? {}

      const coordinates = addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

      return is(coordinates) ? (
        <YMapMarker coordinates={coordinates as any}>
          <div className="absolute w-[1.8125rem] h-9 -translate-x-1/2 -translate-y-1/2 max-md:scale-75">
            <IconMap
              provider={EnumTypeProvider.POST}
              onClick={() => {
                dispatchBallonPost(item)
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
    })

  return null
}

MarkerPosts.displayName = "MarkerPosts"
export default MarkerPosts
