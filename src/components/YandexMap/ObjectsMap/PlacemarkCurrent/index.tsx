"use client"

import { type FC, memo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer } from "@/store"

import { TYPE_ICON } from "./constants"
import { IconCategory } from "@/lib/icon-set"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({ coordinates, id, idUser, offer }) => {
  return coordinates.map((item) => <Place key={`${item[0]}-${item[1]}-${id}`} item={item} id={id} idUser={idUser} offer={offer} />)
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceState: FC<Partial<IPlacemarkCurrent> & { item: [number, number] }> = ({ id, item, idUser, offer }) => {
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
        iconImageSize: [37, 37],
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
        } else if (offer?.provider === "discussion") {
          dispatchBallonDiscussion({ visible: true, offer: offer })
          return
        } else if (offer?.provider === "alert") {
          dispatchBallonAlert({ visible: true, offer: offer })
        }
      }}
    />
  )
}

const Place = memo(PlaceState)
