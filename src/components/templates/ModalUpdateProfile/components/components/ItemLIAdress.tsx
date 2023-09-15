"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import type { TItemLIAdress } from "./types/types"
import type {
    IResponseGeocode,
    IFeatureMember,
} from "@/services/addresses/types/geocodeSearch"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"
import { debounce } from "@/lib/debounce"
import { locationName } from "@/lib/location-name"
import { serviceAddresses } from "@/services/addresses"
import { geocodeSearch } from "@/services/addresses/geocodeSearch"

import styles from "./styles/style.module.scss"

export const ItemLIAdress: TItemLIAdress = ({ active, item }) => {
    const { userId, changeAuth } = useAuth()
    const [text, setText] = useState("")
    const [values, setValues] = useState<IResponseGeocode | null>(null)
    const [activeList, setActiveList] = useState(false)

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
            serviceAddresses.deleteAddress(item.id).finally(() => {
                requestAnimationFrame(() => {
                    changeAuth()
                })
            })
        }
    }

    const valueDebounce = debounce((value: string) => {
        console.log("debounce: ", value)
        if (value.length > 2 && activeList) {
            geocodeSearch(value).then((res) => {
                if (res) {
                    setValues(res)
                }
            })
        } else {
            setValues(null)
        }
    }, 1500)

    function handleAddress(item: IFeatureMember) {
        const country = locationName(item, "country")
        const street = locationName(item, "street")
        const house = locationName(item, "house")
        const coordinates = item?.GeoObject?.Point?.pos
        const additional =
            item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text

        const value: IPostAddress = {
            userId: userId!,
            addressType: "main",
            enabled: true,
        }
        if (country) {
            value.country = country
        }
        if (street) {
            value.street = street
        }
        if (house) {
            value.house = house
        }
        if (coordinates) {
            value.coordinates = coordinates.replace(" ", ":")
        }
        if (additional) {
            value.additional = additional
        }

        serviceAddresses
            .postAddress(value)
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
                    value={text}
                    onChange={(value) => {
                        setText(value.target.value)
                        valueDebounce(value.target.value)
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
                    {Array.isArray(
                        values?.response?.GeoObjectCollection?.featureMember,
                    )
                        ? values?.response?.GeoObjectCollection?.featureMember?.map(
                              (item) => (
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
                              ),
                          )
                        : null}
                </ul>
            </div>
        </li>
    )
}
