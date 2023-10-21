"use client"

import dynamic from "next/dynamic"
import { useState, memo, useInsertionEffect } from "react"
import { isMobile } from "react-device-detect"
import { Map } from "@pbe/react-yandex-maps"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { Notifications } from "./Notifications"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { CreationAlertAndDiscussionMap } from "../templates"
import { StandardContextMenu } from "./ObjectsMap/StandardContextMenu"

import { useAuth } from "@/store/hooks"
import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"
import { useAddress, useOutsideClickEvent } from "@/helpers"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { getGeocodeSearchCoords } from "@/services/addresses/geocodeSearch"

const COORD = [55.75, 37.67]

const YandexMap: TYandexMap = ({}) => {
    const { userId } = useAuth()
    const [visibleNotification, setVisibleNotification] = useState(false)
    const { coordinatesAddresses } = useAddress()
    const [isOpen, setIsOpen, refCreate] = useOutsideClickEvent()
    const [addressInit, setAddressInit] = useState<IPostAddress | null>(null)
    const { coordinates, zoom, dispatchMapCoordinates } = useMapCoordinates()

    console.log("coordinates: ", coordinates)

    useInsertionEffect(() => {
        if (!coordinates) {
            if (!!coordinatesAddresses && coordinatesAddresses?.length) {
                dispatchMapCoordinates({
                    coordinates: coordinatesAddresses[0]!,
                })
            } else {
                dispatchMapCoordinates({ coordinates: COORD })
            }
        }
    }, [coordinatesAddresses, coordinates])

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
                addressType: "",
                enabled: false,
            }
            const elem =
                response?.response?.GeoObjectCollection?.featureMember[0]
            if (!elem) return null
            if (elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind) {
                data.addressType =
                    elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind!
            }
            const longitude = elem?.GeoObject?.Point?.pos?.split(" ")[0]
            const latitude = elem?.GeoObject?.Point?.pos?.split(" ")[1]
            const country = getLocationName(elem, "country")
            const street = getLocationName(elem, "street")
            const house = getLocationName(elem, "house")
            const city = getLocationName(elem, "locality")
            const region = getLocationName(elem, "province")
            const district = getLocationName(elem, "area")
            const additional =
                elem?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
            const coordinates = elem?.GeoObject?.Point?.pos
            if (longitude) data.longitude = longitude
            if (latitude) data.latitude = latitude
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
    }

    function handleAddressLocation() {
        if ("geolocation" in navigator) {
            navigator?.geolocation?.getCurrentPosition(
                (position) => {
                    let latitude = position?.coords?.latitude
                    let longitude = position?.coords?.longitude

                    if (latitude && longitude) {
                        dispatchMapCoordinates({
                            coordinates: [latitude, longitude],
                        })
                    }
                },
                (error) => {
                    console.log("error location: ", error)
                },
            )
        } else {
            console.error("Вы не дали доступ к геолокации")
        }
    }

    return (
        <>
            <Header
                setVisibleNotification={setVisibleNotification}
                handleAddressLocation={handleAddressLocation}
            />
            {isMobile ? (
                <Notifications
                    visibleNotification={visibleNotification}
                    setVisibleNotification={setVisibleNotification}
                />
            ) : null}
            <Map
                state={{
                    center: coordinates,
                    zoom: zoom,
                    behaviors: ["default", "scrollZoom"],
                    type: "yandex#map",
                }}
                width={"100%"}
                height={"100%"}
                options={{
                    maxZoom: 21,
                    minZoom: 10,
                    yandexMapDisablePoiInteractivity: true,
                }}
                onContextMenu={onContextMenu}
                id="map_yandex"
            >
                <ListPlacemark />
                {addressInit ? (
                    <StandardContextMenu addressInit={addressInit} />
                ) : null}
            </Map>
            <CreationAlertAndDiscussionMap
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refCreate={refCreate}
                addressInit={addressInit}
            />
            <MapCardNews />
            <FilterFieldBottom />
        </>
    )
}

export default memo(YandexMap)
