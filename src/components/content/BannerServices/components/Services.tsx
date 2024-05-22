"use client"

import { memo, Suspense, useMemo } from "react"

import type { TServicesFC } from "../types/types"

import { ServiceLoading } from "@/components/common"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { EnumTimesFilter } from "../constants"
import { useBounds, useFiltersServices } from "@/store"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"

import styles from "../styles/style.module.scss"

export const ServicesComponent = memo(function () {
  const { itemsOffers, isLoading } = useMapOffers()
  const bounds = useBounds(({ bounds }) => bounds)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)

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
    }

    return []
  }, [itemsOffers, bounds, timesFilter])

  return (
    <ul className={cx(styles.services)} data-test="ul-services-component">
      <Suspense fallback={false}>
        {isLoading
          ? [1, 2, 3].map((item) => <ServiceLoading key={`::item::loading::offers::${item}`} />)
          : items.map((item) => <CardBallon key={`::offer::general::${item.id}::`} offer={item} />)}
      </Suspense>
    </ul>
  )
})
