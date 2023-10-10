"use client"

import dynamic from "next/dynamic"
import {
    useEffect,
    useState,
    useReducer,
    memo,
    useInsertionEffect,
} from "react"
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
const BalloonPlaceMark = dynamic(() => import("./BalloonPlaceMark"), {
    ssr: false,
})

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
    const [coord, setCoord] = useState({
        x: "50%",
        y: "50%",
    })

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
                coord={coord}
                addressInit={addressInit}
            />
            <MapCardNews />
            <FilterFieldBottom />
            <BalloonPlaceMark />
        </>
    )
}

export default memo(YandexMap)
