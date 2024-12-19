import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { clg } from "@console"
import { TYPE_ICON, TYPE_ICON_URGENT } from "./constants"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer } from "@/store"
import { TTypeInstantsMap } from "../types"
import { useRef } from "react"

function Place(item: IResponseOffers) {
  const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_))

  const instanceRef: TTypeInstantsMap = useRef()

  if (coordinates && Array.isArray(coordinates))
    return (
      <Placemark
        geometry={coordinates}
        modules={["geoObject.addon.balloon"]}
        properties={{ ...item, type: item?.provider }}
        instanceRef={instanceRef}
        options={{
          iconLayout: "default#image",
          iconImageHref: !!item?.urgent ? TYPE_ICON_URGENT[item?.provider!] : TYPE_ICON[item?.provider!],
          iconImageSize: [18.92 * 2, 18.92 * 2.2],
          zIndex: 45,
          zIndexActive: 50,
        }}
        onClick={(event: any) => {
          event.preventDefault()
          event.stopPropagation()
          if (item?.provider === EnumTypeProvider.offer) {
            dispatchBallonOffer({ offer: item! })
            return
          } else if (item?.provider === EnumTypeProvider.discussion) {
            dispatchBallonDiscussion({ offer: item! })
            return
          } else if (item?.provider === EnumTypeProvider.alert) {
            dispatchBallonAlert({ offer: item! })
          }
        }}
        onLoad={(event) => {
          event.ready().then((_) => {
            if (item.id === 336) {
              clg("onLoad: event ", event)
              clg("onLoad: instanceRef ", instanceRef.current)
            }
          })
        }}
      />
    )

  return null
}

export default Place
