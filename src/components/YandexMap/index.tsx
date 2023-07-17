"use client"

import { useState } from "react"
import { Map } from "@pbe/react-yandex-maps"
import { isMobile } from "react-device-detect"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { Notifications } from "./Notifications"

export const YandexMap: TYandexMap = ({ }) => {
  const [visibleNotification, setVisibleNotification] = useState(false)

  return (
    <>
      <Header
        setVisibleNotification={setVisibleNotification}
      />
      <Notifications
        visibleNotification={visibleNotification}
        setVisibleNotification={setVisibleNotification}
      />
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