"use client"

import { RefObject, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTimesFilter } from "../constants"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import VirtualList from "./VirtualList"
import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { EXCEPTION_POST_MAP } from "@/config/exception"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useUrgentFilter } from "@/store"

const DAY = 86_400_000
const WEEK = DAY * 7
const MONTH = DAY * 31
const now = new Date().valueOf()
const time = (created: string | Date) => new Date(created).valueOf()

const objTime = {
  [EnumTimesFilter.DAYS]: DAY,
  [EnumTimesFilter.WEEK]: WEEK,
  [EnumTimesFilter.MONTH]: MONTH,
}

export const ServicesComponent = ({ parentRef }: { parentRef: RefObject<HTMLUListElement> }) => {
  const { itemsOffers, isLoading } = useMapOffers()
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const urgent = useUrgentFilter(({ urgent }) => urgent)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)

  const { data, isLoading: isLoadingPost } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: (providers === "all" || providers === EnumTypeProvider.POST) && activeFilters.length === 0,
    select: ({ data }) => data?.filter((item) => (!!urgent ? !!item?.urgent : true)),
  })

  const itemsPost = data || []

  const itemsFilterPosts = useMemo(() => {
    if (!itemsPost.length) {
      return []
    }
    if (activeFilters.length > 0) {
      return []
    }
    if (bounds && itemsPost) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      const array: IPosts[] = []

      for (const item of itemsPost) {
        if (!EXCEPTION_POST_MAP.includes(item.id)) {
          if (item?.addresses && item?.addresses.length > 0) {
            const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)
            if (
              coordinates[0] < maxCoors[0] &&
              coordinates[0] > minCoords[0] &&
              coordinates[1] < maxCoors[1] &&
              coordinates[1] > minCoords[1]
            ) {
              if (timesFilter === EnumTimesFilter.ALL) {
                array.push(item)
              } else {
                const time_ = time(item.created)
                if (time_ + objTime[timesFilter] - now > 0) {
                  array.push(item)
                }
              }
            }
          }
        }
      }

      return array
    }

    return []
  }, [itemsPost, bounds, timesFilter, activeFilters])

  const items = useMemo(() => {
    if (!itemsOffers.length) {
      return []
    }
    if (bounds && itemsOffers) {
      const array: IResponseOffers[] = []

      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      for (const item of itemsOffers) {
        if (item?.addresses) {
          if (item?.addresses.length > 0) {
            const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)
            if (coordinates.length > 0) {
              if (
                coordinates[0] < maxCoors[0] &&
                coordinates[0] > minCoords[0] &&
                coordinates[1] < maxCoors[1] &&
                coordinates[1] > minCoords[1]
              ) {
                if (timesFilter === EnumTimesFilter.ALL) {
                  array.push(item)
                } else {
                  const time_ = time(item.created)
                  if (time_ + objTime[timesFilter] - now > 0) {
                    array.push(item)
                  }
                }
              }
            }
          }
        }
      }

      return array
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
}
