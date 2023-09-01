"use client"

import { useState } from "react"
import Image from "next/image"

import type { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"
import type { TItemLIAdress } from "./types/types"

import { cx } from "@/lib/cx"
import { geocodeSearch } from "@/services/addresses/geocodeSearch"
import { debounce } from "@/lib/debounce"

import styles from "./styles/style.module.scss"

export const ItemLIAdress: TItemLIAdress = ({
    active,
}) => {
    const [values, setValues] = useState<IResponseGeocode | null>(null)
    const [activeList, setActiveList] = useState(false)

    function onFocus() { setActiveList(true) }
    function onBlur() {
        setActiveList(false)
        setTimeout(() => { setValues(null) }, 300)
    }
    
    const valueDebounce = debounce((value: string) => {
        console.log("debounce: ", value)
        if (value.length > 2 && activeList) {
            geocodeSearch(value)
                .then(res => {
                    if (res) {
                        setValues(res)
                    }
                })
        } else {
            setValues(null)
        }
    }, 1500)

    function handleAddress() {
        
    }

    return (
        <li className={cx(active && styles.active)}>
            <div className={cx(styles.checkBox)}><div className={styles.center} /></div>
            <div className={styles.containerInput}>
                <Image
                    src="/svg/marker-pin-black.svg"
                    alt="marker-pin-black"
                    height={20}
                    width={20}
                    className={styles.geoBlack}
                />
                <input
                    onChange={value => { valueDebounce(value.target.value) }}
                    placeholder="Записать новый"
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <div className={styles.containerRed}>
                    <Image
                        src="/svg/trash-red.svg"
                        alt="trash-red"
                        width={20}
                        height={20}
                    />
                </div>
                <ul className={cx(values && activeList && styles.activeList)}>
                    {
                        Array.isArray(values?.response?.GeoObjectCollection?.featureMember) 
                            ? values?.response?.GeoObjectCollection?.featureMember?.map(item => (
                                <li
                                    key={`${item?.GeoObject?.uri}`}
                                    onClick={handleAddress}
                                >
                                    <span>{item?.GeoObject?.description}</span>
                                </li>
                            )) : null
                    }
                </ul>
            </div>
        </li>
    )
}