"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type IQueriesOffers } from "@/services/offers/types"

import { getOffers, getOffersCategories } from "@/services"
import { useFiltersScreen, useFiltersServices, useSearchFilters, useUrgentFilter } from "@/store"

export const useMapOffers = () => {
  const idTitleCategory = useSearchFilters(({ id }) => id)
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  const objProvider = useMemo(() => {
    const obj: IQueriesOffers = {}

    if (providers !== "all") {
      obj.provider = providers
    }

    if (!!urgent) {
      obj.urgent = urgent
    }

    return obj
  }, [providers, urgent])

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

  const {
    data: dataOffers,
    isLoading,
    refetch,
  } = useQuery({
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
    itemsOffers: dataOffers?.data?.filter((item) => (idTitleCategory ? item?.categoryId === idTitleCategory : true)) || [],
    isLoading,
    refetch,
  }
}
