"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"
import { Map } from "@pbe/react-yandex-maps"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { Notifications } from "./Notifications"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { CreationAlertAndDiscussionMap } from "../templates"

import { useAddress, useOutsideClickEvent } from "@/helpers"

const YandexMap: TYandexMap = ({}) => {
    const [visibleNotification, setVisibleNotification] = useState(false)
    const { coordinatesAddresses } = useAddress()
    const [isOpen, setIsOpen, refCreate] = useOutsideClickEvent()
    const [coord, setCoord] = useState({
        x: "50%",
        y: "50%",
    })
    function onContextMenu(e: any) {
        setIsOpen(true)
        const x = e?._sourceEvent?.originalEvent?.clientPixels?.[0]
            ? e?._sourceEvent?.originalEvent?.clientPixels?.[0]
            : "50%"
        const y = e?._sourceEvent?.originalEvent?.clientPixels?.[1]
            ? e?._sourceEvent?.originalEvent?.clientPixels?.[1]
            : "50%"
        setCoord({
            x,
            y,
        })
    }

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
                onContextMenu={onContextMenu}
                id="map_yandex"
            >
                <ListPlacemark />
            </Map>
            <CreationAlertAndDiscussionMap
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refCreate={refCreate}
                coord={coord}
            />
            <MapCardNews />
            <FilterFieldBottom />
        </>
    )
}

export default YandexMap
