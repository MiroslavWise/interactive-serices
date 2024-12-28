"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useQuery } from "@tanstack/react-query"
import { Feature } from "@yandex/ymaps3-clusterer"
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"
import { type IPosts } from "@/services/posts/types"

import IconPost from "../icons/IconPost"
import IconHelp from "../icons/IconHelp"
import { ImageCategory } from "../common"
import IconMap from "../icons/map-svg/IconMap"
import IconAlertBalloon from "../icons/IconAlertBalloon"

import {
  useBounds,
  useFiltersServices,
  dispatchBallonPost,
  dispatchBallonOffer,
  dispatchBallonAlert,
  dispatchMapZoomClick,
  dispatchCollapseServicesTrue,
} from "@/store"
import { cx } from "@/lib/cx"
import { formatOfMMM } from "@/helpers"
import { getPosts } from "@/services/posts"
import { JSONStringBounds } from "@/utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"

type ReactifiedApi = ReactifiedModule<typeof ymaps3>
type FeatureCluster = Feature & {
  properties: {
    provider: EnumTypeProvider
    offer?: IResponseOffers
    post?: IPosts
  }
}

function AllClusters() {
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>()
  const [MapClusterer, setMapClusterer] = React.useState<any>()
  const [size, setSize] = React.useState<any>()

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3?.import("@yandex/ymaps3-clusterer@0.0.1"), ymaps3.ready]).then(
      async ([{ reactify }, cl]) => {
        const react = reactify.bindTo(React, ReactDOM)
        setReactifiedApi(react.module(ymaps3))
        const { clusterByGrid, YMapClusterer } = react.module(cl)
        //@ts-ignore
        const grid = clusterByGrid({ gridSize: 64 })
        setSize(grid)
        setMapClusterer(YMapClusterer)
      },
    )
  }, [])

  const { itemsOffers } = useMapOffers()
  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: ["all", EnumTypeProvider.POST].includes(providers),
  })

  const listPosts = data?.data ?? []
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

  function marker({ properties, geometry }: FeatureCluster) {
    const { provider, post, offer } = properties ?? {}

    if (!is(geometry.coordinates as number[])) return null

    const title =
      provider === EnumTypeProvider.POST
        ? post?.title
        : provider === EnumTypeProvider.offer
        ? offer?.category?.title ?? offer?.title
        : offer?.title
    const created = provider === EnumTypeProvider.POST ? post?.updated ?? post?.created : offer?.updated ?? offer?.created

    const urgent = provider === EnumTypeProvider.POST ? !!post?.urgent : !!offer?.urgent

    return (
      <YMapMarker coordinates={geometry.coordinates}>
        <div className={cx("absolute z-20 -translate-x-1/2 -translate-y-1/2 max-md:scale-75 group", "w-[2.1875rem] h-[2.5625rem]")}>
          <IconMap
            provider={provider}
            urgent={urgent}
            onClick={() => {
              if (provider === EnumTypeProvider.offer) {
                dispatchBallonOffer({ offer: offer! })
                return
              }
              if (provider === EnumTypeProvider.alert) {
                dispatchBallonAlert({ offer: offer! })
                return
              }
              if (provider === EnumTypeProvider.POST) {
                dispatchBallonPost(post!)
                return
              }
            }}
          />
          {urgent ? (
            <div className="-z-[1] [background:var(--more-red-gradient)] rounded-r-md py-1.5 pr-2.5 pl-6 grid grid-cols-[1rem_minmax(0,1fr)] gap-2 items-center absolute w-max max-w- left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100">
              <div className="w-4 h-4 relative p-2">
                <IconHelp />
              </div>
              <span className="text-xs text-text-button font-medium line-clamp-1 text-ellipsis">{title ?? "Щедрое сердце"}</span>
            </div>
          ) : (
            <div className="div-alert-text flex absolute w-max left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100">
              <section className="flex flex-col h-11">
                <p className="text-[#000] line-clamp-1 text-ellipsis text-sm font-medium">{title}</p>
                <time className="text-text-secondary text-[0.8125rem] line-clamp-1 text-ellipsis font-normal leading-4">
                  {formatOfMMM(created ?? "")}
                </time>
              </section>
            </div>
          )}
        </div>
      </YMapMarker>
    )
  }

  const cluster = (coordinates: any, features: FeatureCluster[]) => {
    const lengthAll = features.length ?? 1
    const lengthOffer = features.filter((_) => _.properties.provider === EnumTypeProvider.offer).length ?? 0
    const lengthAlert = features.filter((_) => _.properties.provider === EnumTypeProvider.alert).length ?? 0

    const percentOffer = Number(((lengthOffer / lengthAll) * 100).toFixed(1))
    const percentAlert = Number(((lengthAlert / lengthAll) * 100).toFixed(1))

    const background = `conic-gradient(
      var(--text-accent) 0% ${percentOffer}%,
      var(--text-error) ${percentOffer}% ${percentOffer + percentAlert}%,
      var(--card-svg-yellow) ${percentOffer + percentAlert}% 100%
    )`

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
        <div
          className="group rounded-full circle-conic flex items-center justify-center cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 z-40 transition-colors max-md:scale-75"
          style={{
            background: background,
          }}
        >
          <div className="w-10 h-10 bg-BG-second rounded-full flex items-center justify-center group-hover:scale-90 transition-transform">
            <span className="text-center text-text-primary text-sm">{features?.length}</span>
          </div>
          <article className="absolute bg-BG-second top-1/2 -translate-y-1/2 left-9 max-w-80 w-max hidden z-50 rounded-lg group-hover:flex overflow-hidden shadow-box-down">
            <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5 max-h-52 overflow-hidden overflow-y-scroll">
              {features.map(({ id, properties, geometry }) => {
                const { provider, offer, post } = properties ?? {}

                const title =
                  provider === EnumTypeProvider.POST
                    ? post?.title
                    : provider === EnumTypeProvider.offer
                    ? offer?.category?.title ?? offer?.title
                    : offer?.title

                return (
                  <li
                    key={`:dv:bVC:xcb:--${id}:`}
                    className="w-full p-1.5 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 items-center bg-BG-second hover:bg-grey-field rounded-md cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation()
                      const { coordinates: coord } = geometry ?? {}
                      dispatchMapZoomClick((coord ?? coordinates) as number[], 17)

                      if (provider === EnumTypeProvider.offer) {
                        dispatchBallonOffer({ offer: offer! })
                        return
                      }
                      if (provider === EnumTypeProvider.alert) {
                        dispatchBallonAlert({ offer: offer! })
                        return
                      }

                      if (provider === EnumTypeProvider.POST) {
                        dispatchBallonPost(post!)
                        return
                      }
                    }}
                  >
                    <div
                      className={cx(
                        "w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2",
                        properties.provider === EnumTypeProvider.offer ? "*:w-4 *:h-4" : "*:w-6 *:h-6",
                      )}
                    >
                      {properties.provider === EnumTypeProvider.offer ? (
                        <ImageCategory
                          isUrgent={!!properties?.offer?.urgent}
                          provider={properties?.offer?.provider}
                          slug={properties?.offer?.slug}
                          id={properties?.offer?.categoryId!}
                        />
                      ) : properties.provider === EnumTypeProvider.alert ? (
                        <IconAlertBalloon />
                      ) : properties.provider === EnumTypeProvider.POST ? (
                        <IconPost />
                      ) : null}
                    </div>
                    <span className="text-sm text-text-primary font-normal line-clamp-1 text-ellipsis">{title ?? ""}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        </div>
      </YMapMarker>
    )
  }

  if (!MapClusterer)
    return [
      ...itemsOffers.map((item) => {
        const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

        if (["all", EnumTypeProvider.offer, EnumTypeProvider.alert].includes(providers))
          return marker({
            type: "Feature",
            id: `${item.provider}-${item.id}`,
            geometry: {
              type: "Point",
              coordinates: coordinates as any,
            },
            properties: {
              provider: item.provider,
              offer: item,
            },
          })
        return null
      }),
      ...listPosts.map((item) => {
        const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]
        if (["all", EnumTypeProvider.POST].includes(providers))
          return marker({
            type: "Feature",
            id: `${EnumTypeProvider.POST}-${item.id}`,
            geometry: {
              type: "Point",
              coordinates: coordinates as any,
            },
            properties: {
              provider: EnumTypeProvider.POST,
              post: item,
            },
          })
        return null
      }),
    ]

  return (
    <MapClusterer
      marker={marker}
      cluster={cluster}
      method={size}
      features={[
        ...(["all", EnumTypeProvider.offer, EnumTypeProvider.alert].includes(providers) ? itemsOffers : []).map((item) => {
          const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

          return {
            type: item.provider,
            id: `${item.provider}-${item.id}`,
            geometry: {
              type: "Point",
              coordinates: coordinates as any,
            },
            properties: {
              provider: item.provider,
              offer: item,
            },
          }
        }),
        ...(["all", EnumTypeProvider.POST].includes(providers) ? listPosts : []).map((item) => {
          const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_)) ?? [0, 0]

          return {
            type: EnumTypeProvider.POST,
            id: `${EnumTypeProvider.POST}-${item.id}`,
            geometry: {
              type: "Point",
              coordinates: coordinates as any,
            },
            properties: {
              provider: EnumTypeProvider.POST,
              post: item,
            },
          }
        }),
      ]}
    />
  )
}

AllClusters.displayName = "AllClusters"
export default AllClusters
