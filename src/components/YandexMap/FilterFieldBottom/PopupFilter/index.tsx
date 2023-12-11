"use client"

import { useState } from "react"
import Image from "next/image"

import type { TPopupFilter } from "./types"

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

    const categoriesMain = categories?.filter((item) => item?.provider === "main") || []

    return (
        <div className={cx(styles.popupFilter, visible && styles.visible)}>
            <SearchInput value={value} setValue={setValue} placeholder="Что Вы ищете" classNames={[styles.inputSearch]} />
            <ul>
                {categoriesMain.map((item) => (
                    <li
                        key={`${item.id}_filters`}
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
