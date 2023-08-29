"use client"

import { useState } from "react"
import { Map } from "@pbe/react-yandex-maps"
import { isMobile } from "react-device-detect"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { Notifications } from "./Notifications"
import { ListPlacemark } from "./ObjectsMap"
import { MapCardNews } from "./MapCard"

export const YandexMap: TYandexMap = ({ }) => {
  const [visibleNotification, setVisibleNotification] = useState(false)

  return (
    <>
      <Header
        setVisibleNotification={setVisibleNotification}
      />
      {
        isMobile
          ? (
            <Notifications
              visibleNotification={visibleNotification}
              setVisibleNotification={setVisibleNotification}
            />
          ) : null
      }
      <Map
        width={"100%"}
        height={"100%"}
        defaultState={{ center: [55.75, 37.67], zoom: 16 }}
        id="map_yandex"
        
      >
        <ListPlacemark />
      </Map>
      <MapCardNews />
      <FilterFieldBottom />
    </>
  )
}