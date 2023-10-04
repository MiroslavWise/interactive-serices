"use client"

import { useQuery } from "react-query"
import { type Dispatch, useMemo } from "react"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { serviceOffer } from "@/services/offers"
import { IActionBalloon } from "../../types"

export const ListPlacemark = ({
    dispatch,
}: {
    dispatch: Dispatch<IActionBalloon>
}) => {
    const { data: dataPlaces } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffer.get(),
    })

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
                        item?.addresses?.map((_item) => [
                            Number(_item.coordinates.split(" ")[0]),
                            Number(_item.coordinates.split(" ")[1]),
                        ])
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
