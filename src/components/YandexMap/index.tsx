"use client"

import { isMobile } from "react-device-detect"
import { Clusterer, Map } from "@pbe/react-yandex-maps"
import { useState, useEffect, useCallback, useRef } from "react"

import type { TTypeInstantsMap, TYandexMap } from "./types"
import type { IResponseOffers } from "@/services/offers/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { CreationAlertAndDiscussionMap } from "../templates"
import { StandardContextMenu } from "./ObjectsMap/StandardContextMenu"

import { generateShortHash } from "@/lib/hash"
import { getGeocodeSearchCoords } from "@/services"
import { getLocationName } from "@/lib/location-name"
import { useAddress, useOutsideClickEvent } from "@/helpers"
import { dispatchHasBalloon, useAuth, useBounds, useMapCoordinates } from "@/store"

const COORD = [59.57, 30.19]

const YandexMap: TYandexMap = ({}) => {
    const userId = useAuth(({ userId }) => userId)
    const { coordinatesAddresses } = useAddress()
    const [isOpen, setIsOpen, refCreate] = useOutsideClickEvent()
    const [addressInit, setAddressInit] = useState<IPostAddress | undefined>(undefined)
    const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
    const zoom = useMapCoordinates(({ zoom }) => zoom)
    const dispatchMapCoordinates = useMapCoordinates(({ dispatchMapCoordinates }) => dispatchMapCoordinates)
    const instanceRef: TTypeInstantsMap = useRef()
    const bounds = useBounds(({ bounds }) => bounds)
    const dispatchBounds = useBounds(({ dispatchBounds }) => dispatchBounds)

    async function get({ mapTwo, mapOne }: { mapOne: number; mapTwo: number }) {
        return getGeocodeSearchCoords(`${mapTwo},${mapOne}`).then((response) => {
            const data: IPostAddress = {
                addressType: "",
                enabled: false,
            }
            const elem = response?.response?.GeoObjectCollection?.featureMember[0]
            if (!elem) return null
            if (elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind) {
                data.addressType = elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind!
            }
            const longitude = elem?.GeoObject?.Point?.pos?.split(" ")[0]
            const latitude = elem?.GeoObject?.Point?.pos?.split(" ")[1]
            const country = getLocationName(elem, "country")
            const street = getLocationName(elem, "street")
            const house = getLocationName(elem, "house")
            const city = getLocationName(elem, "locality")
            const region = getLocationName(elem, "province")
            const district = getLocationName(elem, "area")
            const additional = elem?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
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

            return data!
        })
    }

    function onContextMenu(e: any) {
        if (!userId) {
            return
        }
        const mapOne: number = e?._sourceEvent?.originalEvent?.coords?.[0]
        const mapTwo: number = e?._sourceEvent?.originalEvent?.coords?.[1]

        get({ mapOne, mapTwo }).then((response) => {
            if (response) {
                console.log("response: ", response)
                setAddressInit(response)
            }
        })
        setIsOpen(true)
    }

    const handleAddressLocation = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator?.geolocation?.getCurrentPosition(
                (position) => {
                    let latitude = position?.coords?.latitude
                    let longitude = position?.coords?.longitude

                    if (latitude && longitude) {
                        dispatchMapCoordinates({
                            coordinates: [latitude, longitude],
                        })
                        instanceRef?.current?.setCenter([latitude, longitude])
                    }
                },
                (error) => {
                    console.log("%c error location: ", "color: #f00", error)
                },
            )
        } else {
            if (!!coordinatesAddresses && coordinatesAddresses?.length) {
                dispatchMapCoordinates({
                    coordinates: coordinatesAddresses[0]!,
                })
                instanceRef?.current?.setCenter(coordinatesAddresses[0]!)
            }
            console.error("%c Вы не дали доступ к геолокации", "color: #f00")
        }
    }, [coordinatesAddresses, dispatchMapCoordinates, instanceRef])

    useEffect(() => {
        if (!coordinates) {
            handleAddressLocation()
        }
    }, [coordinates, handleAddressLocation])

    return (
        <>
            <Header handleAddressLocation={handleAddressLocation} />
            <Map
                instanceRef={instanceRef}
                onContextMenu={onContextMenu}
                onLoad={(event) => {
                    event.ready().then(() => {
                        if (!bounds?.length) {
                            const bounds = instanceRef.current?.getBounds()
                            dispatchBounds({ bounds })
                        }

                        instanceRef.current?.events.add("actionend", (events: any) => {
                            const bounds: number[][] | undefined = events.originalEvent?.target?._bounds
                            dispatchBounds({ bounds })
                        })
                    })
                }}
                state={{
                    center: coordinates || COORD,
                    zoom: zoom,
                    behaviors: ["default"],
                    type: "yandex#map",
                }}
                options={{
                    maxZoom: 21,
                    minZoom: 7,
                    yandexMapDisablePoiInteractivity: true,
                }}
                width={"100%"}
                height={"100%"}
                modules={[]}
            >
                <Clusterer
                    options={{
                        iconLayout: "cluster#pieChart",
                        iconContentLayout: "cluster#pieChart",
                        hasBalloon: false,
                        iconPieChartStrokeWidth: 2,
                        clusterDisableClickZoom: true,
                        iconPieChartCoreRadius: 8,
                    }}
                    onClick={async (event: any) => {
                        const coord = event?.originalEvent?.currentTarget?._mapChildComponent?._map?._bounds as number[][]
                        let ids: { id: number; offer: IResponseOffers }[] = []
                        if (event?.originalEvent?.currentTarget?._objects) {
                            const maps = Object.values(event?.originalEvent?.currentTarget?._objects as object)
                                .filter((value) => !!value?.cluster)
                                ?.map((value) => value?.geoObject?.properties?._data)
                                ?.filter(
                                    (item) =>
                                        (item?.item[0] >= coord[0][0] || item?.item[0] <= coord[1][0]) &&
                                        (item?.item[1] >= coord[0][1] || item?.item[1] <= coord[1][1]),
                                )

                            for (let i = 0; i < maps.length; i++) {
                                ids.push({
                                    id: maps[i]?.id,
                                    offer: maps[i]?.offer,
                                })
                            }
                        }

                        dispatchHasBalloon({
                            visibleHasBalloon: true,
                            offers: ids?.map((item) => item.offer),
                        })
                    }}
                >
                    <ListPlacemark />
                </Clusterer>
                {addressInit ? <StandardContextMenu addressInit={addressInit} /> : null}
            </Map>
            <CreationAlertAndDiscussionMap isOpen={isOpen} setIsOpen={setIsOpen} refCreate={refCreate} addressInit={addressInit} />
            <MapCardNews />
            {!isMobile ? <FilterFieldBottom /> : null}
        </>
    )
}

export default YandexMap
