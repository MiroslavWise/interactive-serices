"use client"

import { memo, useMemo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import type { IPlacemarkCurrent } from "./types"

import { TYPE_ICON, TYPE_ICON_URGENT } from "./constants"
import { IconCategory, IconCategoryPNG } from "@/lib/icon-set"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, useFiltersServices } from "@/store"

export const ListPlacemark = memo(function ListPlacemark() {
  const { itemsOffers } = useMapOffers()
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
                offer: item,
              })
            }
          }
        })
    }

    return array
  }, [itemsOffers, timesFilter])

  return marks.map((item) => (
    <Placemark
      key={`${item.offer.id}-${item.offer.provider}-list`}
      geometry={item?.coordinates[0]}
      modules={["geoObject.addon.balloon"]}
      properties={{ ...item?.offer }}
      options={{
        iconLayout: "default#image",
        iconImageHref: !!item?.offer?.urgent
          ? TYPE_ICON_URGENT[item?.offer?.provider!]
          : TYPE_ICON[item?.offer?.provider!] || IconCategory(item?.offer?.categoryId!),
        iconImageSize: [18.92 * 2, 18.92 * 2],
        zIndex: 45,
        zIndexActive: 50,
      }}
      onClick={(event: any) => {
        event.preventDefault()
        event.stopPropagation()
        if (item?.offer?.provider === EnumTypeProvider.offer) {
          dispatchBallonOffer({ offer: item?.offer! })
          return
        } else if (item?.offer?.provider === EnumTypeProvider.discussion) {
          dispatchBallonDiscussion({ offer: item?.offer! })
          return
        } else if (item?.offer?.provider === EnumTypeProvider.alert) {
          dispatchBallonAlert({ offer: item?.offer! })
        }
      }}
    />
  ))
})
