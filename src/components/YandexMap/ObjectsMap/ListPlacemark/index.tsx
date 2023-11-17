"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { serviceOffers } from "@/services/offers"
import { useBalloonCard } from "@/store/state/useBalloonCard"

const $ListPlacemark = () => {
    const { data: dataPlaces } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffers.get(),
    })
    const { dispatch } = useBalloonCard()

    const marks: IPlacemarkCurrent[] = useMemo(() => {
        const array: IPlacemarkCurrent[] = []

        if (dataPlaces?.res && Array.isArray(dataPlaces.res)) {
            dataPlaces?.res
                ?.filter(
                    (item) =>
                        Array.isArray(item?.addresses) &&
                        item?.addresses?.length,
                )
                ?.forEach((item, index) => {
                    const coordinates: [number, number][] =
                        item?.addresses?.map((_item) => {
                            if (_item.coordinates) {
                                return [
                                    Number(_item.coordinates.split(" ")[0]),
                                    Number(_item.coordinates.split(" ")[1]),
                                ]
                            }
                            return [0, 0]
                        })
                    const provider = item?.provider
                    const title = item?.title
                    array.push({
                        coordinates: coordinates,
                        provider: provider,
                        idUser: item?.userId!,
                        id: item?.id!,
                        title: title,
                        dispatch: dispatch,
                    })
                })
        }

        return array
    }, [dataPlaces?.res, dispatch])

    return marks.map((item) => (
        <PlacemarkCurrent
            key={`${item.id}-${item.provider}-list`}
            {...item}
            dispatch={dispatch}
        />
    ))
}

export const ListPlacemark = memo($ListPlacemark)
