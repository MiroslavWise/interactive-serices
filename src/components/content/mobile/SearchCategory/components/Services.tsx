"use client"

import { useQuery } from "@tanstack/react-query"
import { memo, type RefObject, useMemo } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import VirtualList from "./VirtualList"
import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersServices, useUrgentFilter } from "@/store"
import { EXCEPTION_POST_MAP } from "@/config/exception"
import { IPosts } from "@/services/posts/types"

const DAY = 86_400_000
const WEEK = DAY * 7
const MONTH = DAY * 31

const now = new Date().valueOf()

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

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    enabled: providers === "all" || providers === EnumTypeProvider.POST,
    select: ({ data }) => data?.filter((item) => (!!urgent ? !!item?.urgent : true)),
  })

  const itemsPost = data ?? []

  const itemsFilterPosts = useMemo(() => {
    const array: IPosts[] = []

    if (bounds && itemsPost) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      for (const item of itemsPost) {
        if (item.addresses.length === 0 || EXCEPTION_POST_MAP.includes(item.id)) {
          continue
        }

        const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)
        if (coordinates.length !== 2) {
          continue
        }
        if (
          coordinates[0] < maxCoors[0] &&
          coordinates[0] > minCoords[0] &&
          coordinates[1] < maxCoors[1] &&
          coordinates[1] > minCoords[1]
        ) {
          continue
        }
        if (timesFilter === EnumTimesFilter.ALL) {
          array.push(item)
        } else {
          const time = new Date(item.created).valueOf()
          const b = time + OBJ_TIME[timesFilter] - now > 0
          if (b) {
            array.push(item)
          }
        }
      }
    }

    return array
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
        return dataAllItems.filter((item) => {
          const time = new Date(item.created).valueOf()

          return time + OBJ_TIME[timesFilter] - now > 0
        })
      }
    }

    return []
  }, [itemsOffers, bounds, timesFilter])

  if (isLoading)
    return (
      <ul className="w-full p-5 flex flex-col gap-4 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)] *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  return <VirtualList parentRef={parentRef} list={items} listPosts={itemsFilterPosts} />
})
