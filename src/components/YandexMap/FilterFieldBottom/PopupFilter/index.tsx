"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import type { TPopupFilter } from "./types"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"
import { BUTTON_PAGINATION } from "./constants"
import { useOffersCategories } from "@/store/hooks"
import { useFilterMap, dispatchFilterMap } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const PopupFilter: TPopupFilter = ({ visible }) => {
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
    const categories = useOffersCategories(({ categories }) => categories)
    const [value, setValue] = useState("")

    const categoriesMain: IResponseOffersCategories[] = useMemo(() => {
        const array = Array.from(
            new Set(categories?.filter((item) => item?.title?.toLowerCase().includes(value?.toLowerCase())).map((item) => item.provider)),
        )
        const arrayMain = categories
            ?.filter((item) => item.provider === "main")
            ?.filter((item) => array.some((_) => _.includes(item.slug)) || item.title?.toLowerCase()?.includes(value?.toLowerCase()))

        return [...arrayMain]
    }, [categories, value])

    return (
        <div className={styles.popupFilter} data-visible={visible}>
            <SearchInput value={value} setValue={setValue} placeholder="Что именно вы хотите найти?" classNames={[styles.inputSearch]} />
            <ul>
                {categoriesMain.map((item) => (
                    <li
                        key={`${item.id}-filters`}
                        onClick={() => {
                            dispatchFilterMap(item.id)
                        }}
                        data-active={idsNumber.includes(item.id)}
                    >
                        <div
                            data-icon
                            style={{
                                backgroundImage: `url(/svg/category/${item.id}.svg)`,
                            }}
                        />
                        <p>{item.title}</p>
                    </li>
                ))}
            </ul>
            {BUTTON_PAGINATION.map((item) => (
                <div key={`${item.image.alt}`} className={cx(styles.button, styles[item.className])}>
                    <Image src={item.image.src} alt={item.image.alt} height={18} width={18} unoptimized />
                </div>
            ))}
        </div>
    )
}
