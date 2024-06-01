"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers, getOffersCategories } from "@/services"
import { useFiltersScreen, useFiltersServices, useSearchFilters } from "@/store"

export const useMapOffers = () => {
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const objProvider = providers === "all" ? {} : { provider: providers }
  const idTitleCategory = useSearchFilters(({ id }) => id)

  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []

  const activeCategories = useMemo(() => {
    if (!categories || !categories?.length || !activeFilters.length) return []

    const mainSlug = Array.from(new Set(activeFilters.map((item) => categories.find((find) => find.id === item)?.slug!)))

    const filters = categories?.filter((item) => mainSlug.includes(item?.slug) || mainSlug.includes(item.provider))

    return filters.map((item) => item.id)
  }, [categories, activeFilters])

  const obj = activeCategories.length && ["all", EnumTypeProvider.offer].includes(providers) ? { category: activeCategories.join(",") } : {}

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getOffers({ order: "DESC", ...obj, ...objProvider }),
    queryKey: [
      "offers",
      {
        ...obj,
        ...objProvider,
      },
    ],
  })

  return {
    itemsOffers: data?.res?.filter((item) => (idTitleCategory ? item?.categoryId === idTitleCategory : true)) || [],
    isLoading,
    refetch,
  }
}
