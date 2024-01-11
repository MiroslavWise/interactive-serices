"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { serviceOffers } from "@/services/offers"
import { IQueriesOffers } from "@/services/offers/types"
import { useFilterMap, useBalloonCard } from "@/store/hooks"

const $ListPlacemark = () => {
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const obj = idsNumber.length
        ? ({ category: idsNumber.join(","), order: "DESC" } as IQueriesOffers)
        : ({ order: "DESC" } as IQueriesOffers)

    const { data: dataPlaces } = useQuery({
        queryKey: ["offers", `category=${idsNumber.join(":")}`],
        queryFn: () => serviceOffers.get(obj),
    })

    const marks: IPlacemarkCurrent[] = useMemo(() => {
        const array: IPlacemarkCurrent[] = []

        if (dataPlaces?.res && Array.isArray(dataPlaces.res)) {
            dataPlaces?.res
                ?.filter((item) => Array.isArray(item?.addresses) && item?.addresses?.length)
                ?.forEach((item, index) => {
                    const coordinates: [number, number][] = item?.addresses?.map((_item) => {
                        if (_item.coordinates) {
                            return [Number(_item.coordinates.split(" ")[0]), Number(_item.coordinates.split(" ")[1])]
                        }
                        return [0, 0]
                    })
                    array.push({
                        coordinates: coordinates,
                        idUser: item?.userId!,
                        id: item?.id!,
                        dispatch: dispatch,
                        offer: item,
                    })
                })
        }

        return array
    }, [dataPlaces?.res, dispatch])

    return marks.map((item) => <PlacemarkCurrent key={`${item.id}-${item.offer.provider}-list`} {...item} dispatch={dispatch} />)
}

export const ListPlacemark = memo($ListPlacemark)
