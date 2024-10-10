"use client"

import { memo, RefObject, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTimesFilter } from "../constants"
import { EnumTypeProvider } from "@/types/enum"

import VirtualList from "./VirtualList"
import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersServices, useUrgentFilter } from "@/store"
import { EXCEPTION_POST_MAP } from "@/config/exception"

export const ServicesComponent = memo(function ({ parentRef }: { parentRef: RefObject<HTMLUListElement> }) {
  const { itemsOffers, isLoading } = useMapOffers()
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  const { data, isLoading: isLoadingPost } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: providers === "all" || providers === EnumTypeProvider.post,
    select: ({ data }) => data?.filter((item) => (!!urgent ? !!item?.urgent : true)),
  })

  const itemsPost = data || []

  const itemsFilterPosts = useMemo(() => {
    if (!itemsPost.length) {
      return []
    }
    if (bounds && itemsPost) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      const dataAllItems =
        itemsPost?.filter((item) => {
          if (!item?.addresses?.length) {
            return false
          }
          if (EXCEPTION_POST_MAP.includes(item.id)) {
            return false
          }
          const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)
          if (!coordinates) {
            return false
          }

          if (
            coordinates[0] < maxCoors[0] &&
            coordinates[0] > minCoords[0] &&
            coordinates[1] < maxCoors[1] &&
            coordinates[1] > minCoords[1]
          ) {
            return true
          }

          return false
        }) || []

      if (timesFilter === EnumTimesFilter.ALL) {
        return dataAllItems || []
      } else {
        const day = 86_400_000
        const week = day * 7
        const month = day * 31

        const objTime = {
          [EnumTimesFilter.DAYS]: day,
          [EnumTimesFilter.WEEK]: week,
          [EnumTimesFilter.MONTH]: month,
        }

        return dataAllItems.filter((item) => {
          const time = new Date(item.created).valueOf()
          const now = new Date().valueOf()

          return time + objTime[timesFilter] - now > 0
        })
      }
    }

    return []
  }, [itemsPost, bounds, timesFilter])

  const items = useMemo(() => {
    if (!itemsOffers.length) {
      return []
    }
    if (bounds && itemsOffers) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      const dataAllItems =
        itemsOffers?.filter((item) => {
          if (!item?.addresses?.length) {
            return false
          }
          const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)
          if (!coordinates) {
            return false
          }

          if (
            coordinates[0] < maxCoors[0] &&
            coordinates[0] > minCoords[0] &&
            coordinates[1] < maxCoors[1] &&
            coordinates[1] > minCoords[1]
          ) {
            return true
          }

          return false
        }) || []

      if (timesFilter === EnumTimesFilter.ALL) {
        return dataAllItems || []
      } else {
        const day = 86_400_000
        const week = day * 7
        const month = day * 31

        const objTime = {
          [EnumTimesFilter.DAYS]: day,
          [EnumTimesFilter.WEEK]: week,
          [EnumTimesFilter.MONTH]: month,
        }

        return dataAllItems.filter((item) => {
          const time = new Date(item.created).valueOf()
          const now = new Date().valueOf()

          return time + objTime[timesFilter] - now > 0
        })
      }
    }

    return []
  }, [itemsOffers, bounds, timesFilter])

  if (isLoading || isLoadingPost)
    return (
      <ul className="load relative w-full flex flex-col items-start h-fit gap-2.5 *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  return <VirtualList list={items} listPosts={itemsFilterPosts} parentRef={parentRef} />
})
