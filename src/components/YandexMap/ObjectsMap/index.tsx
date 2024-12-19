"use client"

import { memo, useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"

import Place from "./Place"

import { clg } from "@console"
import { useFiltersServices } from "@/store"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"

function ListPlacemark() {
  const { itemsOffers } = useMapOffers()
  const providers = useFiltersServices(({ providers }) => providers)

  useEffect(() => {
    if (itemsOffers.length > 0) {
      setTimeout(() => {
        const elements = document.querySelector(".ymaps-2-1-79-placemark-overlay")

        let div = document.createElement("div")

        div.className = "div-alert-text"
        div.innerHTML = `
          <section>
            <p>Привет, как ваши дела?</p>
            <time>сегодня в 9:05</time>
          </section>
        `

        if (elements) {
          elements.append(div)
        }

        clg("elements: ", elements)
      }, 5000)
    }
  }, [itemsOffers])

  if (["all", EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(providers))
    return itemsOffers.map((item) => {
      return <Place {...item} key={`:dg:sd:f:d:s${item.id}:${item.provider}`} />
    })

  return null
}

ListPlacemark.displayName = "ListPlacemark"
export default memo(ListPlacemark)
