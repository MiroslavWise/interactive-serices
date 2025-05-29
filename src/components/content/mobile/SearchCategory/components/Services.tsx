"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IPosts } from "@/services/posts/types"
import { IResponseOffers } from "@/services/offers/types"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import { ServiceLoading } from "@/components/common"
import EmptyArticle from "@/components/content/BannerSearch/components/EmptyArticle"
import VirtualList from "@/components/content/BannerServices/components/VirtualList"

import { getPosts } from "@/services/posts"
import { UTILS_DATA_MAP } from "@/utils/utils-data-map"
import { mapSort, JSONStringBounds } from "@/utils/map-sort"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { useBounds, useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"

interface IProps {
  posts: IPosts[]
  offers: IResponseOffers[]
  isSearch: boolean
  loading: boolean
}

export const ServicesMobile = memo(({ posts, offers, isSearch, loading }: IProps) => {
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

  const itemsPost = data ?? []

  const stringBounds = JSONStringBounds(bounds)

  const itemsFilterPosts = useMemo(() => {
    if (!!idSearch || activeFilters.length > 0) {
      return []
    }

    const array: IPosts[] = []

    const items = isSearch && posts.length > 0 ? posts : !isSearch && itemsPost.length > 0 ? itemsPost : []

    if (bounds && items) {
      const newArray = mapSort({ bounds: bounds, items: items })

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
  }, [itemsPost, stringBounds, timesFilter, activeFilters, idSearch, posts, isSearch])

  const items = useMemo(() => {
    const array: IResponseOffers[] = []

    const items = isSearch && offers.length > 0 ? offers : !isSearch && itemsOffers.length > 0 ? itemsOffers : []

    if (bounds && items) {
      const newSortMap = mapSort<IResponseOffers>({ bounds, items })

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
  }, [itemsOffers, stringBounds, timesFilter, idSearch, offers, isSearch])

  if (isLoading || isLoadingPost || loading)
    return (
      <ul className="w-full h-full p-5 flex flex-col gap-4 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)] *:bg-BG-first">
        {[1, 2, 3].map((item) => (
          <ServiceLoading key={`::item::loading::offers::${item}`} />
        ))}
      </ul>
    )

  if (isSearch && items.length === 0 && itemsFilterPosts.length === 0) return <EmptyArticle />

  return <VirtualList list={items} listPosts={itemsFilterPosts} />
})
