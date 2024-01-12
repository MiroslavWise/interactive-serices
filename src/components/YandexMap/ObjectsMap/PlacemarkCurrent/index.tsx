"use client"

import { type FC, memo } from "react"
import { Placemark, useYMaps } from "@pbe/react-yandex-maps"

import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { dispatchBallonOffer } from "@/store/hooks"

import { TYPE_ICON } from "./constants"
import { IconCategory } from "@/lib/icon-set"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({ coordinates, id, idUser, dispatch, offer }) => {
    return coordinates.map((item) => (
        <Place key={`${item[0]}-${item[1]}-${id}`} item={item} id={id} idUser={idUser} dispatch={dispatch} offer={offer} />
    ))
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceState: FC<Partial<IPlacemarkCurrent> & { item: [number, number] }> = ({ id, item, idUser, dispatch, offer }) => {
    const ymaps = useYMaps(["templateLayoutFactory", " Placemark"])

    return (
        <Placemark
            geometry={item.reverse()}
            properties={{
                id: id!,
                offer: offer,
                idUser: idUser,
                item: item,
            }}
            options={{
                iconLayout: "default#image",
                iconImageHref: TYPE_ICON[offer?.provider!!].default || IconCategory(offer?.categoryId!),
                iconImageSize: [32, 32],
                hideIconOnBalloonOpen: false,
                zIndex: 45,
                balloonZIndex: "42",
                zIndexActive: 50,
                iconColor:
                    offer?.provider === "alert"
                        ? "#eb3f5e"
                        : offer?.provider === "offer"
                        ? "#a26be8"
                        : offer?.provider === "discussion"
                        ? "#ee4e29"
                        : "#000",
            }}
            onClick={(event: any) => {
                event.preventDefault()
                event.stopPropagation()
                if (offer?.provider === "offer") {
                    dispatchBallonOffer({ visible: true, offer: offer })
                    return
                }
                if (dispatch) {
                    dispatch({
                        visible: true,
                        type: offer?.provider!,
                        id: Number(id),
                        idUser: Number(idUser),
                    })
                }
            }}
        />
    )
}

const Place = memo(PlaceState)
