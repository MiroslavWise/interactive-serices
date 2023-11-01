"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

import type { TItemLIAdress } from "./types/types"
import type {
    IResponseGeocode,
    IFeatureMember,
} from "@/services/addresses/types/geocodeSearch"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"
import { useDebounce } from "@/helpers"
import { getLocationName } from "@/lib/location-name"
import { serviceAddresses } from "@/services/addresses"
import { getGeocodeSearch } from "@/services/addresses/geocodeSearch"

import styles from "./styles/style.module.scss"
import { generateShortHash } from "@/lib/hash"

export const ItemLIAdress: TItemLIAdress = ({ active, item }) => {
    const { userId, changeAuth } = useAuth()
    const [text, setText] = useState("")
    const [values, setValues] = useState<IResponseGeocode | null>(null)
    const [activeList, setActiveList] = useState(false)
    const debouncedValue = useDebounce(onValueFunc, 1500)

    useEffect(() => {
        if (item) {
            if (item?.additional) {
                setText(item?.additional)
            }
        }
    }, [item])

    function onFocus() {
        setActiveList(true)
    }
    function onBlur() {
        setActiveList(false)
        setTimeout(() => {
            setValues(null)
        }, 300)
    }

    function deleteAddress() {
        if (item) {
            serviceAddresses.delete(item.id).finally(() => {
                requestAnimationFrame(() => {
                    changeAuth()
                })
            })
        }
    }

    function onValueFunc() {
        console.log("debounce: ", text)
        if (text.length > 2 && activeList) {
            getGeocodeSearch(text).then((response) => setValues(response))
        }
    }

    const exactAddresses = useMemo(() => {
        if (!values) {
            return null
        }
        return (
            values?.response?.GeoObjectCollection?.featureMember?.filter(
                (item) =>
                    item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.some(
                        (_) => _?.kind === "house",
                    ),
            ) || null
        )
    }, [values])

    function handleAddress(item: IFeatureMember) {
        const coordinates = item?.GeoObject?.Point?.pos
        const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
        const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]
        const additional =
            item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
        const value: IPostAddress = {
            addressType: "main",
            enabled: true,
        }
        const country = getLocationName(item, "country")
        const street = getLocationName(item, "street")
        const house = getLocationName(item, "house")
        const city = getLocationName(item, "locality")
        const region = getLocationName(item, "province")
        const district = getLocationName(item, "area")
        if (longitude) value.longitude = longitude
        if (latitude) value.latitude = latitude
        if (country) value.country = country
        if (street) value.street = street
        if (house) value.house = house
        if (city) value.city = city
        if (region) value.region = region
        if (district) value.district = district
        if (coordinates) value.coordinates = coordinates
        if (additional) value.additional = additional
        const hash = generateShortHash(additional!)
        if (hash) value.hash = hash

        serviceAddresses
            .post(value)
            .then((response) => {
                console.log("response address: ", response)
            })
            .finally(() => {
                setActiveList(false)
                setValues(null)
                setText("")
                changeAuth()
            })
    }

    return (
        <li className={cx(active && styles.active)}>
            <div className={cx(styles.checkBox)}>
                <div className={styles.center} />
            </div>
            <div className={styles.containerInput}>
                <Image
                    src="/svg/marker-pin-black.svg"
                    alt="marker-pin-black"
                    height={20}
                    width={20}
                    className={styles.geoBlack}
                />
                <input
                    disabled={!!item}
                    value={text}
                    onChange={(value) => {
                        setText(value.target.value)
                        debouncedValue()
                    }}
                    placeholder="Записать новый"
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <div className={styles.containerRed} onClick={deleteAddress}>
                    <Image
                        src="/svg/trash-red.svg"
                        alt="trash-red"
                        width={20}
                        height={20}
                    />
                </div>
                <ul className={cx(values && activeList && styles.activeList)}>
                    {values &&
                    exactAddresses &&
                    Array.isArray(
                        values?.response?.GeoObjectCollection?.featureMember,
                    ) &&
                    Array.isArray(exactAddresses) &&
                    exactAddresses?.length === 0 &&
                    values?.response?.GeoObjectCollection?.featureMember
                        ?.length > exactAddresses?.length ? (
                        <h3>Введите более точный адрес</h3>
                    ) : Array.isArray(exactAddresses) ? (
                        exactAddresses?.map((item) => (
                            <li
                                key={`${item?.GeoObject?.uri}`}
                                onClick={() => handleAddress(item)}
                            >
                                <span>
                                    {
                                        item?.GeoObject?.metaDataProperty
                                            ?.GeocoderMetaData?.text
                                    }
                                </span>
                            </li>
                        ))
                    ) : null}
                    {}
                </ul>
            </div>
        </li>
    )
}
