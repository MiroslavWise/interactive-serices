"use client"

import { memo, useMemo } from "react"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { useFiltersServices } from "@/store"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

export const ListPlacemark = memo(function ListPlacemark() {
  const { itemsOffers, isLoading } = useMapOffers()
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)

  const marks: IPlacemarkCurrent[] = useMemo(() => {
    const array: IPlacemarkCurrent[] = []

    if (itemsOffers && Array.isArray(itemsOffers)) {
      itemsOffers
        ?.filter((item) => Array.isArray(item?.addresses) && item?.addresses?.length)
        ?.forEach((item) => {
          const coordinates: [number, number][] = item?.addresses?.map((_item) => {
            if (_item.coordinates) {
              const split = _item.coordinates.split(" ")
              return [Number(split[0]), Number(split[1])]
            }
            return [0, 0]
          })

          if (timesFilter === EnumTimesFilter.ALL) {
            array.push({
              coordinates: coordinates,
              idUser: item?.userId!,
              id: item?.id!,
              offer: item,
            })
          } else {
            const day = 86_400_000
            const week = day * 7
            const month = day * 31

            const objTime = {
              [EnumTimesFilter.DAYS]: day,
              [EnumTimesFilter.WEEK]: week,
              [EnumTimesFilter.MONTH]: month,
            }

            const time = new Date(item.created).valueOf()
            const now = new Date().valueOf()

            if (time + objTime[timesFilter] - now > 0) {
              array.push({
                coordinates: coordinates,
                idUser: item?.userId!,
                id: item?.id!,
                offer: item,
              })
            }
          }
        })
    }

    return array
  }, [itemsOffers, timesFilter])

  return marks.map((item) => <PlacemarkCurrent key={`${item.id}-${item.offer.provider}-list`} {...item} />)
})
