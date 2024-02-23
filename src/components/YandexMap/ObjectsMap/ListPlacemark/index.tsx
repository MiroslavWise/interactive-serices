"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { getOffers } from "@/services"
import { useFilterMap } from "@/store"

export const ListPlacemark = memo(function ListPlacemark() {
  const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)

  const obj = idsNumber.length ? { category: idsNumber.join(",") } : {}

  const { data: dataPlaces } = useQuery({
    queryFn: () => getOffers({ order: "DESC", ...obj }),
    queryKey: ["offers", `category=${idsNumber.join(":")}`],
  })

  const marks: IPlacemarkCurrent[] = useMemo(() => {
    const array: IPlacemarkCurrent[] = []

    if (dataPlaces?.res && Array.isArray(dataPlaces.res)) {
      dataPlaces?.res
        ?.filter((item) => Array.isArray(item?.addresses) && item?.addresses?.length)
        ?.forEach((item) => {
          const coordinates: [number, number][] = item?.addresses?.map((_item) => {
            if (_item.coordinates) {
              const split = _item.coordinates.split(" ")
              return [Number(split[0]), Number(split[1])]
            }
            return [0, 0]
          })
          array.push({
            coordinates: coordinates,
            idUser: item?.userId!,
            id: item?.id!,
            offer: item,
          })
        })
    }

    return array
  }, [dataPlaces?.res])

  return marks.map((item) => <PlacemarkCurrent key={`${item.id}-${item.offer.provider}-list`} {...item} />)
})
