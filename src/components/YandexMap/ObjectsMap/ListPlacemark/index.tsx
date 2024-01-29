"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TOrder } from "@/services/types/general"
import type { TTypeProvider } from "@/services/file-upload/types"
import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { serviceOffers } from "@/services"
import { useFilterMap, useBalloonCard, useProviderOffersMap } from "@/store"

export const ListPlacemark = memo(function ListPlacemark() {
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const type = useProviderOffersMap(({ type }) => type)

    const typeOffers = useMemo(() => {
        if (["offer", "request"].includes(type)) {
            return {
                get: {
                    provider: type as TTypeProvider,
                    order: "DESC" as TOrder,
                },
                keys: ["offers", `provider=${type}`],
            }
        } else {
            return {
                get: {
                    order: "DESC" as TOrder,
                },
                keys: ["offers"],
            }
        }
    }, [type])

    const obj = idsNumber.length ? { category: idsNumber.join(",") } : {}

    const { data: dataPlaces } = useQuery({
        queryFn: () => serviceOffers.get({ ...typeOffers.get!, ...obj }),
        queryKey: [...typeOffers.keys, `category=${idsNumber.join(":")}`],
        enabled: !!type,
    })

    const marks: IPlacemarkCurrent[] = useMemo(() => {
        const array: IPlacemarkCurrent[] = []

        if (dataPlaces?.res && Array.isArray(dataPlaces.res)) {
            dataPlaces?.res
                ?.filter((item) => Array.isArray(item?.addresses) && item?.addresses?.length)
                ?.forEach((item) => {
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
})
