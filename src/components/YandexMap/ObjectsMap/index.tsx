"use client"

import { memo } from "react"

import { EnumTypeProvider } from "@/types/enum"

import Place from "./Place"

import { useFiltersServices } from "@/store"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"

function ListPlacemark() {
  const { itemsOffers } = useMapOffers()
  const providers = useFiltersServices(({ providers }) => providers)

  if (["all", EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(providers))
    return itemsOffers.map((item) => {
      return <Place {...item} key={`:dg:sd:f:d:s${item.id}:${item.provider}`} />
    })

  return null
}

ListPlacemark.displayName = "ListPlacemark"
export default memo(ListPlacemark)
