"use client"

import { Map, Placemark } from "@pbe/react-yandex-maps"

import { TYandexMap } from "./types"
import { SearchFieldTop } from "./SearchFieldTop"
import { FilterFieldBottom } from "./FilterFieldBottom"

export const YandexMap: TYandexMap = ({ }) => {
  return (
    <>
      <SearchFieldTop />
      <Map
        width={"100%"}
        height={"100%"}
        defaultState={{ center: [55.75, 37.57], zoom: 12 }}
      >
      </Map>
      <FilterFieldBottom />
    </>
  )
}