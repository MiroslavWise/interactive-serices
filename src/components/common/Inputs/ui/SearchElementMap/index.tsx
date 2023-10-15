"use client"

import { useState } from "react"
import Image from "next/image"

import type {
    IFeatureMember,
    IResponseGeocode,
} from "@/services/addresses/types/geocodeSearch"
import type { TSearchElementMap } from "./types"

import { cx } from "@/lib/cx"
import { useDebounce } from "@/helpers"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { getGeocodeSearch } from "@/services/addresses/geocodeSearch"

import styles from "./style.module.scss"

export const SearchElementMap: TSearchElementMap = ({
    handleAddressLocation,
}) => {
    const [text, setText] = useState("")
    const [activeList, setActiveList] = useState(false)
    const [values, setValues] = useState<IResponseGeocode | null>(null)
    const debouncedValue = useDebounce(onValueFunc, 1500)

    const { dispatchMapCoordinates } = useMapCoordinates()

    function onFocus() {
        setActiveList(true)
    }

    function onBlur() {
        setTimeout(() => {
            setActiveList(false)
            setValues(null)
        }, 300)
    }

    function onValueFunc() {
        console.log("debounce: ", text)
        if (text.length > 2 && activeList) {
            getGeocodeSearch(text).then((response) => {
                console.log("values response: ", response)
                setValues(response)
            })
        }
    }

    function handleAddress(value: IFeatureMember) {
        console.log("value: ", value)
        if (value) {
            const longitude = value?.GeoObject?.Point?.pos?.split(" ")[0]
            const latitude = value?.GeoObject?.Point?.pos?.split(" ")[1]

            const coordinates = [Number(latitude), Number(longitude)]
            console.log("coordinates: ", coordinates)
            dispatchMapCoordinates({
                coordinates: coordinates,
                zoom: 18,
            })
        }
    }

    return (
        <div className={cx(styles.container)} id="searchElementMap">
            <Image
                className={styles.geoImage}
                src="/svg/geo-marker.svg"
                alt="geo"
                width={20}
                height={20}
            />
            <input
                type="text"
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Выберите местоположение"
                className={styles.input}
                onChange={(event) => {
                    event.preventDefault()
                    setText(event.target.value)
                    debouncedValue()
                }}
            />
            <div className={styles.circleMark} onClick={handleAddressLocation}>
                <Image src="/svg/mark.svg" alt="mark" width={20} height={20} />
            </div>
            {activeList && values?.response ? (
                <ul className={cx(activeList && styles.active)}>
                    {values?.response?.GeoObjectCollection?.featureMember?.map(
                        (item) => (
                            <li
                                key={`${item.GeoObject.uri}-key-item-map`}
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.isPropagationStopped()
                                    event.stopPropagation()
                                    handleAddress(item)
                                }}
                            >
                                <span>
                                    {
                                        item?.GeoObject?.metaDataProperty
                                            ?.GeocoderMetaData?.text
                                    }
                                </span>
                            </li>
                        ),
                    )}
                </ul>
            ) : null}
        </div>
    )
}
