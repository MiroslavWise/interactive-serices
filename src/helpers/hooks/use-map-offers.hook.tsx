"use client"

import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers, type IQueriesOffers } from "@/services/offers/types"

import { getOffers, getOffersCategories } from "@/services"
import { useFiltersScreen, useFiltersServices, useUrgentFilter } from "@/store"

const LIMIT = 100

export const useMapOffers = () => {
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  const objProvider = useMemo(() => {
    const obj: IQueriesOffers = {}

    if (providers !== "all" && [EnumTypeProvider.alert, EnumTypeProvider.offer].includes(providers)) {
      obj.provider = providers
    }

    if (!!urgent && providers !== EnumTypeProvider.alert) {
      obj.urgent = urgent
    }

    return obj
  }, [providers, urgent])

  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.data || []

  const activeCategories = useMemo(() => {
    if (!categories || !categories?.length || !activeFilters.length) return []

    const mainSlug = Array.from(new Set(activeFilters.map((item) => categories.find((find) => find.id === item)?.slug!)))

    const array: number[] = []

    for (const item of categories) {
      if (mainSlug.includes(item?.slug) || mainSlug.includes(item.provider)) {
        array.push(item.id)
      }
    }

    return array
  }, [categories, activeFilters])

  const obj = activeCategories.length && EnumTypeProvider.offer === providers ? { category: activeCategories.join(",") } : {}

  const { data, isLoading: is } = useQuery({
    queryFn: () =>
      getOffers({
        order: "DESC",
        limit: 1,
        ...obj,
        ...objProvider,
      }),
    queryKey: [
      "offers-total",
      {
        ...obj,
        ...objProvider,
      },
    ],
  })

  const total = data?.meta?.total
  const array = Array.from({ length: Math.ceil((total || 0) / LIMIT) }).map((_, index) => index + 1)

  const responses = useQueries({
    queries: array.map((number) => ({
      queryFn: () =>
        getOffers({
          order: "DESC",
          limit: LIMIT,
          page: number,
          ...obj,
          ...objProvider,
        }),
      queryKey: [
        "offers",
        {
          limit: LIMIT,
          page: number,
          ...obj,
          ...objProvider,
        },
      ],
      enabled: !!total && !!data?.data && Array.isArray(data?.data),
    })),
  })

  const isLoading = responses.some((item) => item.isLoading)

  const offers = useMemo(() => {
    const _offers: IResponseOffers[][] = []

    if (!isLoading && !is) {
      for (const item of responses) {
        if (item.data?.data && Array.isArray(item.data.data)) {
          _offers.push(item.data?.data)
        }
      }
    }

    return _offers.flat()
  }, [responses, is])

  return {
    itemsOffers: offers,
    isLoading: isLoading || is,
    refetch: () => Promise.resolve(),
  }
}
