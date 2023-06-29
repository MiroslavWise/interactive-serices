"use client"

import { Map } from "@pbe/react-yandex-maps"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { FilterFieldBottom } from "./FilterFieldBottom"

export const YandexMap: TYandexMap = ({ }) => {
  return (
    <>
      <Header />
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