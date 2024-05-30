"use client"

import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import type { TPlacemarkCurrent } from "./types"

import { TYPE_ICON } from "./constants"
import { IconCategory } from "@/lib/icon-set"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchModal, EModalData } from "@/store"

export const PlacemarkCurrent: TPlacemarkCurrent = ({ coordinates, offer }) => (
  <Placemark
    geometry={coordinates[0]}
    className={offer?.provider}
    modules={["geoObject.addon.balloon"]}
    properties={{
      id: offer?.id!,
      offer: offer,
      idUser: offer?.userId,
      item: coordinates[0],
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
