"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"
import { Map, GeoObject } from "@pbe/react-yandex-maps"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { Notifications } from "./Notifications"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { CreationAlertAndDiscussionMap } from "../templates"

import { useAuth } from "@/store/hooks"
import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"
import { useAddress, useOutsideClickEvent } from "@/helpers"
import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { getGeocodeSearchCoords } from "@/services/addresses/geocodeSearch"

const YandexMap: TYandexMap = ({}) => {
    const { userId } = useAuth()
    const [visibleNotification, setVisibleNotification] = useState(false)
    const { coordinatesAddresses } = useAddress()
    const [isOpen, setIsOpen, refCreate] = useOutsideClickEvent()
    const [coord, setCoord] = useState({
        x: "50%",
        y: "50%",
    })
    const [addressInit, setAddressInit] = useState<IPostAddress | null>(null)

    function onContextMenu(e: any) {
        if (!userId) {
            return
        }
        setIsOpen(true)
        const mapOne: number = e?._sourceEvent?.originalEvent?.coords?.[0]
        const mapTwo: number = e?._sourceEvent?.originalEvent?.coords?.[1]

        getGeocodeSearchCoords(`${mapTwo},${mapOne}`).then((response) => {
            const data: IPostAddress = {
                userId: userId,
                addressType: "main",
                enabled: false,
            }
            const elem =
                response?.response?.GeoObjectCollection?.featureMember[0]
            if (!elem) return null
            if (elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind) {
                data.addressType =
                    elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind!
            }
            const country = getLocationName(elem, "country")
            const street = getLocationName(elem, "street")
            const house = getLocationName(elem, "house")
            const city = getLocationName(elem, "locality")
            const region = getLocationName(elem, "province")
            const district = getLocationName(elem, "area")
            const additional =
                elem?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
            const coordinates = elem?.GeoObject?.Point?.pos
            if (country) data.country = country
            if (street) data.street = street
            if (house) data.house = house
            if (city) data.city = city
            if (region) data.region = region
            if (district) data.district = district
            if (coordinates) data.coordinates = coordinates
            if (additional) {
                data.additional = additional
            }
            const hash = generateShortHash(additional!)
            if (hash) data.hash = hash
            setAddressInit(data)
        })
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
                options={{
                    maxZoom: 20,
                    minZoom: 12,
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
                addressInit={addressInit}
            />
            <MapCardNews />
            <FilterFieldBottom />
        </>
    )
}

export default YandexMap
