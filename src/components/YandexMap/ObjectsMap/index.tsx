"use client"

import { memo, useEffect, useMemo } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { type IPlacemarkCurrent } from "./types"

import { clg } from "@console"
import { TYPE_ICON, TYPE_ICON_URGENT } from "./constants"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, useFiltersServices } from "@/store"

function ListPlacemark() {
  const { itemsOffers } = useMapOffers()
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const providers = useFiltersServices(({ providers }) => providers)

  // useEffect(() => {
  //   if (itemsOffers.length > 0) {
  //     setTimeout(() => {
  //       const elements = document.querySelector(".ymaps-2-1-79-placemark-overlay")

  //       let div = document.createElement("div")

  //       div.className = "div-alert-text"
  //       div.innerHTML = `
  //         <section>
  //           <p>Привет, как ваши дела?</p>
  //           <time>сегодня в 9:05</time>
  //         </section>
  //       `

  //       if (elements) {
  //         elements.append(div)
  //       }

  //       clg("elements: ", elements)
  //     }, 5000)
  //   }
  // }, [itemsOffers])

  if (["all", EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(providers))
    return itemsOffers.map((item) => {
      const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map((_) => Number(_))

      if (coordinates && Array.isArray(coordinates))
        return (
          <Placemark
            key={`${item.id}-${item.provider}-list`}
            geometry={coordinates}
            modules={["geoObject.addon.balloon"]}
            properties={{ ...item, type: item?.provider }}
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
                const {} = event ?? {}
                clg("onLoad: ready", event.modules)
              })
            }}
          />
        )

      return null
    })

  return null
}

ListPlacemark.displayName = "ListPlacemark"
export default memo(ListPlacemark)
