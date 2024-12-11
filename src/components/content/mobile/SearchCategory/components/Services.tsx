"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import { ServiceLoading } from "@/components/common"

import { getPosts } from "@/services/posts"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"
import { EXCEPTION_POST_MAP } from "@/config/exception"
import { IPosts } from "@/services/posts/types"
import { IResponseOffers } from "@/services/offers/types"
import VirtualList from "@/components/content/BannerServices/components/VirtualList"

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

interface IProps {
  posts: IPosts[]
  offers: IResponseOffers[]
  isSearch: boolean
}

export const ServicesMobile = memo(({ posts, offers, isSearch }: IProps) => {
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
    enabled: (providers === "all" || providers === EnumTypeProvider.POST) && activeFilters.length === 0 && posts.length > 0 && !isSearch,
    select: ({ data }) => data?.filter((item) => (!!urgent ? !!item?.urgent : true)),
  })

  const itemsPost = data || []

  const itemsFilterPosts = useMemo(() => {
    if (!!idSearch || activeFilters.length > 0) {
      return []
    }

    const array: IPosts[] = []

    const items = isSearch && posts.length > 0 ? posts : !isSearch && itemsPost.length > 0 ? itemsPost : []

    if (bounds && items) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      for (const item of items) {
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
  }, [itemsPost, bounds, timesFilter, activeFilters, idSearch, posts, isSearch])

  const items = useMemo(() => {
    const array: IResponseOffers[] = []

    const items = isSearch && offers.length > 0 ? offers : !isSearch && itemsOffers.length > 0 ? itemsOffers : []

    if (bounds && items) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      for (const item of items) {
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
  }, [itemsOffers, bounds, timesFilter, idSearch, offers, isSearch])

  if (isLoading || isLoadingPost)
    return (
      <ul className="w-full h-full p-5 flex flex-col gap-4 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)] *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  return <VirtualList list={items} listPosts={itemsFilterPosts} />
})
