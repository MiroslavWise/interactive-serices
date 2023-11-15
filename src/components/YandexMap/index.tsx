"use client"

import { Clusterer, Map } from "@pbe/react-yandex-maps"
import { useState, memo, useEffect, useCallback } from "react"

import type { TYandexMap } from "./types"

import { Header } from "./Header"
import { MapCardNews } from "./MapCard"
import { ListPlacemark } from "./ObjectsMap"
import { FilterFieldBottom } from "./FilterFieldBottom"
import { CreationAlertAndDiscussionMap } from "../templates"
import { StandardContextMenu } from "./ObjectsMap/StandardContextMenu"

import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"
import { useAuth, useHasBalloons } from "@/store/hooks"
import { useAddress, useOutsideClickEvent } from "@/helpers"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { getGeocodeSearchCoords } from "@/services/addresses/geocodeSearch"
import { TTypeProvider } from "@/services/file-upload/types"

const COORD = [55.75, 37.67]

const YandexMap: TYandexMap = ({}) => {
    const { userId } = useAuth()
    const { coordinatesAddresses } = useAddress()
    const [isOpen, setIsOpen, refCreate] = useOutsideClickEvent()
    const [addressInit, setAddressInit] = useState<IPostAddress | null>(null)
    const { coordinates, zoom, dispatchMapCoordinates } = useMapCoordinates()
    const { dispatchHasBalloon } = useHasBalloons()

    async function get({ mapTwo, mapOne }: { mapOne: number; mapTwo: number }) {
        return getGeocodeSearchCoords(`${mapTwo},${mapOne}`).then(
            (response) => {
                const data: IPostAddress = {
                    addressType: "",
                    enabled: false,
                }
                const elem =
                    response?.response?.GeoObjectCollection?.featureMember[0]
                if (!elem) return null
                if (elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind) {
                    data.addressType =
                        elem.GeoObject?.metaDataProperty?.GeocoderMetaData
                            ?.kind!
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

                return data!
            },
        )
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
            } else {
                dispatchMapCoordinates({ coordinates: COORD })
            }
            console.error("%c Вы не дали доступ к геолокации", "color: #f00")
        }
    }, [coordinatesAddresses, dispatchMapCoordinates])

    useEffect(() => {
        if (!coordinates) {
            handleAddressLocation()
        }
    }, [coordinates, handleAddressLocation])

    return (
        <>
            <Header handleAddressLocation={handleAddressLocation} />
            <Map
                state={{
                    center: coordinates,
                    zoom: zoom,
                    behaviors: ["default", "scrollZoom"],
                    type: "yandex#map",
                }}
                width={"100%"}
                height={"100%"}
                defaultOptions={{
                    maxZoom: 21,
                    minZoom: 10,
                    yandexMapDisablePoiInteractivity: true,
                }}
                onContextMenu={onContextMenu}
                modules={[]}
                onLoad={(events) => {
                    console.log("%c onLoad map events: ", "color: #f0f", events)
                }}
            >
                <Clusterer
                    options={{
                        preset: "islands#invertedVioletClusterIcons",
                        groupByCoordinates: true,
                    }}
                    onClick={async (event: any) => {
                        console.log("%c Clusterer: ", "color: yellow", event)
                        const coord = event?.originalEvent?.currentTarget
                            ?._mapChildComponent?._map?._bounds as number[][]
                        const length = coord?.length || 2
                        const c = coord?.reduce((acc, current) => [
                            acc[0] / length + current[0] / length,
                            acc[1] / length + current[1] / length,
                        ])
                        let ids: { id: number; provider: TTypeProvider }[] = []
                        console.log("%c coord c: ", "color: orange", c)
                        if (event?.originalEvent?.currentTarget?._objects) {
                            const maps = Object.values(
                                event?.originalEvent?.currentTarget
                                    ?._objects as object,
                            )
                                .filter((value) => !!value?.cluster)
                                ?.map(
                                    (value) =>
                                        value?.geoObject?.properties?._data,
                                )
                                ?.filter(
                                    (item) =>
                                        (item?.item[0] >= c[0] - 0.1 ||
                                            item?.item[0] <= c[0] + 0.1) &&
                                        (item?.item[1] >= c[1] - 0.1 ||
                                            item?.item[1] <= c[1] + 0.1),
                                )
                            console.log("%c maps: ", "color: blue", maps)

                            ids = maps.map((item) => ({
                                id: item?.id,
                                provider: item?.provider,
                            }))
                        }

                        const address = await get({
                            mapOne: c[0],
                            mapTwo: c[1],
                        })
                        if (address) {
                            dispatchHasBalloon({
                                visible: true,
                                address: address,
                                ids: ids,
                            })
                        }
                    }}
                >
                    <ListPlacemark />
                </Clusterer>
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
