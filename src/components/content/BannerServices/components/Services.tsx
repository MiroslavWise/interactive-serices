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
import { UTILS_DATA_MAP } from "@/utils/utils-data-map"
import { JSONStringBounds, mapSort } from "@/utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"

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

  const stringJSON = JSONStringBounds(bounds)

  const itemsFilterPosts = useMemo(() => {
    const array: IPosts[] = []

    if (!itemsPost.length || !!idSearch || activeFilters.length > 0) {
      return array
    }

    if (bounds && itemsPost && ["all", EnumTypeProvider.POST].includes(providers)) {
      const newArray = mapSort({ bounds: bounds, items: itemsPost })
      for (const item of newArray) {
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
  }, [itemsPost, stringJSON, timesFilter, activeFilters, idSearch, providers])

  const items = useMemo(() => {
    const array: IResponseOffers[] = []
    if (!itemsOffers.length) {
      return array
    }

    if (bounds && itemsOffers && ["all", EnumTypeProvider.offer, EnumTypeProvider.alert].includes(providers)) {
      const newSortMap = mapSort({ bounds, items: itemsOffers })

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
  }, [itemsOffers, stringJSON, timesFilter, idSearch, providers])

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
