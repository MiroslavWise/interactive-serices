"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useQuery } from "@tanstack/react-query"
import { Feature } from "@yandex/ymaps3-clusterer"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import IconPost from "../icons/IconPost"
import IconMap from "../icons/map-svg/IconMap"

import { fromNow } from "@/helpers"
import { getPosts } from "@/services/posts"
import { JSONStringBounds } from "@/utils/map-sort"
import { dispatchBallonPost, dispatchCollapseServicesTrue, dispatchMapZoomClick, useBounds, useFiltersServices } from "@/store"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>

type FeaturePost = Feature & { properties: IPosts }
function MarkerPosts() {
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()
  const [MapClusterer, setMapClusterer] = React.useState<any>()
  const [size, setSize] = React.useState<any>()

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3?.import("@yandex/ymaps3-clusterer@0.0.1"), ymaps3.ready]).then(
      async ([{ reactify }, cl]) => {
        const react = reactify.bindTo(React, ReactDOM)
        const { clusterByGrid, YMapClusterer } = react.module(cl)
        setReactifiedApi(react.module(ymaps3))
        //@ts-ignore
        const grid = clusterByGrid({ gridSize: 64 })
        setSize(grid)
        setMapClusterer(YMapClusterer)
      },
    )
  }, [])

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: ["all", EnumTypeProvider.POST].includes(providers),
  })

  const list = data?.data ?? []
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

  function marker({ properties, geometry }: FeaturePost) {
    const { title, created } = properties ?? {}
    return is(geometry.coordinates as number[]) ? (
      <YMapMarker coordinates={geometry.coordinates}>
        <div className="absolute z-20 w-[1.8125rem] h-9 -translate-x-1/2 -translate-y-1/2 max-md:scale-75 group">
          <IconMap
            provider={EnumTypeProvider.POST}
            onClick={() => {
              dispatchBallonPost(properties)
            }}
          />
          <div className="div-alert-text flex absolute w-max left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100">
            <section className="flex flex-col h-11">
              <p className="text-[#000] line-clamp-1 text-ellipsis text-sm font-medium">{title}</p>
              <time className="text-text-secondary text-[0.8125rem] font-normal leading-4">{fromNow(created ?? "")}</time>
            </section>
          </div>
        </div>
      </YMapMarker>
    ) : null
  }

  function cluster(coordinates: any, features: FeaturePost[]) {
    return (
      <YMapMarker
        coordinates={coordinates}
        onClick={(event, mapEvent) => {
          event.stopPropagation()
          const { coordinates } = mapEvent ?? {}
          dispatchMapZoomClick(coordinates as number[])
          dispatchCollapseServicesTrue()
        }}
      >
        <div className="cluster-post w-10 h-10 group rounded-full bg-BG-second flex items-center justify-center cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 z-40 transition-colors border-2 border-BG-second hover:border-text-accent border-solid max-md:scale-75">
          <span className="text-center text-text-primary text-sm">{features?.length}</span>
          <article className="absolute bg-BG-second top-1/2 -translate-y-1/2 left-9 max-w-80 w-max flex-col gap-0.5 z-50 rounded-lg hidden group-hover:flex px-1.5 py-3 overflow-x-hidden overflow-y-auto max-h-52">
            {features.map(({ id, properties, geometry }) => (
              <li
                key={`:dv:bVC:xcb:--${id}:`}
                className="w-full p-1.5 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 items-center bg-BG-second hover:bg-grey-field rounded-md cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation()
                  const { coordinates: coord } = geometry ?? {}
                  dispatchMapZoomClick((coord ?? coordinates) as number[], 17)

                  dispatchBallonPost(properties)
                }}
              >
                <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
                  <IconPost />
                </div>
                <span className="text-sm text-text-primary font-normal line-clamp-1 text-ellipsis">{properties.title}</span>
              </li>
            ))}
          </article>
        </div>
      </YMapMarker>
    )
  }

  if (["all", EnumTypeProvider.POST].includes(providers)) {
    if (!MapClusterer)
      return list.map((item) => {
        const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_))
        return marker({
          type: "Feature",
          id: `post-${item.id}`,
          geometry: {
            type: "Point",
            coordinates: coordinates as any,
          },
          properties: item as any,
        })
      })

    return (
      <MapClusterer
        marker={marker}
        cluster={cluster}
        method={size}
        features={list.map((item) => {
          const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

          return {
            type: "Feature",
            id: `post-${item.id}`,
            geometry: {
              type: "Point",
              coordinates: coordinates as any,
            },
            properties: item as any,
          }
        })}
      />
    )
  }

  return null
}

MarkerPosts.displayName = "MarkerPosts"
export default MarkerPosts
