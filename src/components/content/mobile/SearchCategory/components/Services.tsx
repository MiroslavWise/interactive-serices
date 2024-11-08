"use client"

import { useQuery } from "@tanstack/react-query"
import { memo, type RefObject, useMemo } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import VirtualList from "./VirtualList"
import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"
import { EXCEPTION_POST_MAP } from "@/config/exception"
import { IPosts } from "@/services/posts/types"
import { IResponseOffers } from "@/services/offers/types"

const DAY = 86_400_000
const WEEK = DAY * 7
const MONTH = DAY * 31
const now = new Date().valueOf()
const time = (created: string | Date) => new Date(created).valueOf()

const OBJ_TIME = {
  [EnumTimesFilter.DAYS]: DAY,
  [EnumTimesFilter.WEEK]: WEEK,
  [EnumTimesFilter.MONTH]: MONTH,
}

export const ServicesMobile = memo(({ input, parentRef }: { input: string; parentRef: RefObject<HTMLUListElement> }) => {
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
                const time_ = time(item.created)
                if (time_ + OBJ_TIME[timesFilter] - now > 0) {
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
                  if (time_ + OBJ_TIME[timesFilter] - now > 0) {
                    array.push(item)
                  }
                }
              }
            }
          }
        }
      }
    }

    return array
  }, [itemsOffers, bounds, timesFilter, idSearch])

  if (isLoading || isLoadingPost)
    return (
      <ul className="w-full p-5 flex flex-col gap-4 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)] *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  return <VirtualList parentRef={parentRef} list={items} listPosts={itemsFilterPosts} />
})
