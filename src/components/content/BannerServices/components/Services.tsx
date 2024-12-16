"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTimesFilter } from "../constants"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import VirtualList from "./VirtualList"
import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { EXCEPTION_POST_MAP } from "@/config/exception"
import { mapSort } from "../../../../utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"
import { UTILS_DATA_MAP } from "@/utils/utils-data-map"

export const ServicesComponent = () => {
  const { itemsOffers, isLoading } = useMapOffers()
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const urgent = useUrgentFilter(({ urgent }) => urgent)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const idSearch = useSearchFilters(({ id }) => id)

  const { data, isLoading: isLoadingPost } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: (providers === "all" || providers === EnumTypeProvider.POST) && activeFilters.length === 0,
    select: ({ data }) => data?.filter((item) => (!!urgent ? !!item?.urgent : true)),
  })

  const itemsPost = data || []

  const itemsFilterPosts = useMemo(() => {
    if (!itemsPost.length || !!idSearch || activeFilters.length > 0) {
      return []
    }

    const array: IPosts[] = []

    if (bounds && itemsPost) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

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
                const time_ = UTILS_DATA_MAP.time(item.created)
                if (time_ + UTILS_DATA_MAP[timesFilter] - UTILS_DATA_MAP.now > 0) {
                  array.push(item)
                }
              }
            }
          }
        }
      }
    }

    return array
  }, [itemsPost, bounds, timesFilter, activeFilters, idSearch])

  const items = useMemo(() => {
    if (!itemsOffers.length) {
      return []
    }

    const array: IResponseOffers[] = []

    if (bounds && itemsOffers) {
      const newSortMap = mapSort<IResponseOffers>({ bounds, items: itemsOffers })

      for (const item of newSortMap) {
        if (timesFilter === EnumTimesFilter.ALL) {
          array.push(item)
        } else {
          const time_ = UTILS_DATA_MAP.time(item.created)
          if (time_ + UTILS_DATA_MAP[timesFilter] - UTILS_DATA_MAP.now > 0) {
            array.push(item)
          }
        }
      }
    }

    return array
  }, [itemsOffers, bounds, timesFilter, idSearch])

  if (isLoading || isLoadingPost)
    return (
      <ul className="load relative w-full flex flex-col items-start h-fit gap-2.5 *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  return <VirtualList list={items} listPosts={itemsFilterPosts} />
}
