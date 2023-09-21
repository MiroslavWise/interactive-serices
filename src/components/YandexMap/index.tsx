"use client"

import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { Map } from "@pbe/react-yandex-maps"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { Notifications } from "./Notifications"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { useAddress } from "@/helpers"

const YandexMap: TYandexMap = ({}) => {
    const [visibleNotification, setVisibleNotification] = useState(false)
    const { coordinatesAddresses } = useAddress()

    return (
        <>
            <Header setVisibleNotification={setVisibleNotification} />
            {isMobile ? (
                <Notifications
                    visibleNotification={visibleNotification}
                    setVisibleNotification={setVisibleNotification}
                />
            ) : null}
            <Map
                width={"100%"}
                height={"100%"}
                defaultState={{
                    center: coordinatesAddresses
                        ? coordinatesAddresses[0]
                        : [55.75, 37.67],
                    zoom: 16,
                }}
                onClick={(e: any) => {
                    console.log("map click: ", e)
                    const one =
                        (e?._cacher._cache?.target?._bounds[0][0] +
                            e?._cacher._cache?.target?._bounds[1][0]) /
                        2
                    const two =
                        (e?._cacher._cache?.target?._bounds[0][1] +
                            e?._cacher._cache?.target?._bounds[1][1]) /
                        2
                    console.log("map coor: ", [one, two])
                }}
                id="map_yandex"
            >
                <ListPlacemark />
            </Map>
            <MapCardNews />
            <FilterFieldBottom />
        </>
    )
}

export default YandexMap
