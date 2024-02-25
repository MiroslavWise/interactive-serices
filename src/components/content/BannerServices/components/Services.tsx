"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TServicesFC } from "../types/types"

import { ServiceLoading, GeneralItem } from "@/components/common"

import { cx } from "@/lib/cx"
import { getOffers } from "@/services"
import { EnumTimesFilter } from "../constants"
import { useBounds, useFilterMap, useFiltersServices } from "@/store"

import styles from "../styles/style.module.scss"

export const ServicesComponent: TServicesFC = memo(function $ServicesComponent() {
  const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
  const bounds = useBounds(({ bounds }) => bounds)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const objProvider = providers === "all" ? {} : { provider: providers }
  const obj = idsNumber.length ? { category: idsNumber.join(",") } : {}

  const { data, isLoading } = useQuery({
    queryFn: () => getOffers({ order: "DESC", ...obj, ...objProvider }),
    queryKey: [
      "offers",
      {
        ...obj,
        ...objProvider,
      },
    ],
  })

  const items = useMemo(() => {
    if (!data?.res) {
      return []
    }
    if (bounds && data?.res) {
      const minCoords = bounds[0]
      const maxCoors = bounds[1]

      const dataAllItems =
        data?.res?.filter((item) => {
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
        const day = 86_400_000
        const week = day * 7
        const month = day * 31

        const objTime = {
          [EnumTimesFilter.DAYS]: day,
          [EnumTimesFilter.WEEK]: week,
          [EnumTimesFilter.MONTH]: month,
        }

        return dataAllItems.filter((item) => {
          const time = new Date(item.created).valueOf()
          const now = new Date().valueOf()

          return time + objTime[timesFilter] - now > 0
        })
      }

      return dataAllItems
    }

    return []
  }, [data?.res, bounds, timesFilter])

  return (
    <ul className={cx(styles.services)}>
      {isLoading
        ? [1, 2, 3].map((item) => <ServiceLoading key={`::item::loading::offers::${item}`} />)
        : items.map((item) => <GeneralItem key={`::offer::general::${item.id}::`} offer={item} />)}
    </ul>
  )
})
