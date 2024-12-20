import { useMemo } from "react"
import { Placemark, useYMaps } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { clg } from "@console"
import { iconOffer } from "@/utils/map/icon-offer"
import { iconAlert } from "@/utils/map/icon-alert"
import { iconDiscussion } from "@/utils/map/icon-discussion"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer } from "@/store"

function Place(item: IResponseOffers) {
  const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_))

  const ymaps = useYMaps(["templateLayoutFactory", "layout.ImageWithContent"])

  const temp = useMemo(() => {
    if (!ymaps) return undefined

    if (item.provider === EnumTypeProvider.offer)
      return ymaps.templateLayoutFactory.createClass(iconOffer(item?.title!, item?.created!, item?.id!))

    if (item.provider === EnumTypeProvider.discussion)
      return ymaps.templateLayoutFactory.createClass(iconDiscussion(item?.title!, item?.created!, item?.id!))
    if (item.provider === EnumTypeProvider.alert)
      return ymaps.templateLayoutFactory.createClass(iconAlert(item?.title!, item?.created!, item?.id!))

    return undefined
  }, [ymaps, coordinates, item])

  if (coordinates && Array.isArray(coordinates))
    return (
      <Placemark
        defaultGeometry={coordinates}
        instanceRef={(ref) => ref.events.add("click", (event) => clg("click", event))}
        modules={["geoObject.addon.balloon"]}
        options={{
          iconLayout: temp,
          cursor: "pointer",
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
            requestAnimationFrame(() => {})
          })
        }}
      />
    )

  return null
}

export default Place
