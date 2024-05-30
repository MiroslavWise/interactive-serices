"use client"

import { type FC, memo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { TYPE_ICON } from "./constants"
import { IconCategory } from "@/lib/icon-set"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchModal, EModalData } from "@/store"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({ coordinates, id, idUser, offer }) => {
  return coordinates.map((item) => <Place key={`${item[0]}-${item[1]}-${id}`} item={item} id={id} idUser={idUser} offer={offer} />)
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceState: FC<Partial<IPlacemarkCurrent> & { item: [number, number] }> = ({ id, item, idUser, offer }) => {
  //
  return (
    <Placemark
      geometry={item}
      className={offer?.provider}
      modules={["geoObject.addon.balloon"]}
      properties={{
        id: id!,
        offer: offer,
        idUser: idUser,
        item: item,
      }}
      options={{
        iconLayout: "default#image",
        iconImageHref: TYPE_ICON[offer?.provider!!].default || IconCategory(offer?.categoryId!),
        iconImageSize: [18.92 * 1.5, 18.92 * 1.5],
        zIndex: 45,
        zIndexActive: 50,
      }}
      onClick={(event: any) => {
        event.preventDefault()
        event.stopPropagation()
        if (offer?.provider === EnumTypeProvider.offer) {
          dispatchBallonOffer({ offer: offer })
          dispatchModal(EModalData.BalloonOffer)
          return
        } else if (offer?.provider === EnumTypeProvider.discussion) {
          dispatchBallonDiscussion({ offer: offer })
          dispatchModal(EModalData.BalloonDiscussion)
          return
        } else if (offer?.provider === EnumTypeProvider.alert) {
          dispatchBallonAlert({ offer: offer })
          dispatchModal(EModalData.BalloonAlert)
        }
      }}
    />
  )
}

const Place = memo(PlaceState)
