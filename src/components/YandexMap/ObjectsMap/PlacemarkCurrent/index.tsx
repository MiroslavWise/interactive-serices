"use client"

import { type FC, memo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { TYPE_ICON } from "./constants"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({
    coordinates,
    title,
    id,
    idUser,
    provider,
    dispatch,
}) => {
    return coordinates.map((item) => (
        <Place
            key={`${item[0]}-${item[1]}-${id}`}
            item={item}
            provider={provider}
            id={id}
            idUser={idUser}
            title={title}
            dispatch={dispatch}
        />
    ))
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceState: FC<
    Partial<IPlacemarkCurrent> & { item: [number, number] }
> = ({ title, id, item, provider, idUser, dispatch }) => {
    return (
        <Placemark
            geometry={item.reverse()}
            properties={{
                id: id!,
                title: title!,
                idUser: idUser,
                item: item,
                provider: provider,
            }}
            options={{
                iconLayout: "default#image",
                iconImageHref:
                    TYPE_ICON[provider!].default || "/map/deffault-offers.png",
                iconImageSize: [48, 54],
                hideIconOnBalloonOpen: false,
                zIndex: 45,
                balloonZIndex: "42",
                zIndexActive: 50,
                iconColor:
                    provider === "alert"
                        ? "#eb3f5e"
                        : provider === "offer"
                        ? "#a26be8"
                        : provider === "request"
                        ? "#3cb7fd"
                        : provider === "discussion"
                        ? "#ee4e29"
                        : "#000",
            }}
            onClick={(event: any) => {
                if (dispatch) {
                    dispatch({
                        visible: true,
                        type: provider!,
                        id: Number(id),
                        idUser: Number(idUser),
                    })
                }
                event.preventDefault()
                event.stopPropagation()
            }}
        />
    )
}

const Place = memo(PlaceState)
