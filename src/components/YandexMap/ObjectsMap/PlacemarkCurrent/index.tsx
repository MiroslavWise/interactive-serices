"use client"

import { type FC, memo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { TYPE_ICON } from "./constants"
import { useBalloonCard } from "@/store/state/useBalloonCard"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({
    coordinates,
    title,
    id,
    idUser,
    provider,
}) => {
    return coordinates.map((item) => (
        <Place
            key={`${item[0]}-${item[1]}-${id}`}
            item={item}
            provider={provider}
            id={id}
            idUser={idUser}
            title={title}
        />
    ))
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceState: FC<
    Partial<IPlacemarkCurrent> & { item: [number, number] }
> = ({ title, id, item, provider, idUser }) => {
    const { dispatch } = useBalloonCard()

    return (
        <Placemark
            geometry={item.reverse()}
            options={{
                iconLayout: "default#image",
                iconImageHref:
                    TYPE_ICON[provider!].default || "/map/deffault-offers.png",
                iconImageSize: [48, 54],
                hideIconOnBalloonOpen: false,
                zIndex: 45,
                balloonZIndex: "42",
                zIndexActive: 50,
            }}
            onClick={(e: any) => {
                dispatch({
                    visible: true,
                    type: provider!,
                    id: Number(id),
                    idUser: Number(idUser),
                })
            }}
        />
    )
}

const Place = memo(PlaceState)
