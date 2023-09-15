"use client"

import { useState } from "react"
import Image from "next/image"

import type { TPopupFilter } from "./types"

import { ImageStatic } from "@/components/common/Image"
import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"
import { BUTTON_PAGINATION, LIST_FILTERS } from "./constants"

import styles from "./styles/style.module.scss"

export const PopupFilter: TPopupFilter = ({ visible }) => {
    const [actives, setActives] = useState<string[]>([])
    const [value, setValue] = useState("")

    return (
        <div className={cx(styles.popupFilter, visible && styles.visible)}>
            <SearchInput
                value={value}
                setValue={setValue}
                placeholder="Что Вы ищете"
                classNames={[styles.inputSearch]}
            />
            <ul className={cx(styles.content)}>
                {LIST_FILTERS.map((item) => (
                    <li
                        key={`${item.value}_filters`}
                        onClick={() => {
                            if (actives.includes(item.value)) {
                                setActives((state) =>
                                    state.filter(
                                        (item_) => item_ !== item.value,
                                    ),
                                )
                            } else {
                                setActives((state) => [...state, item.value])
                            }
                        }}
                        className={cx(
                            actives.includes(item.value) && styles.active,
                        )}
                    >
                        <div className={styles.icon}>
                            <ImageStatic
                                src={item.image.src}
                                alt={item.image.alt}
                                width={16}
                                height={16}
                                classNames={[]}
                            />
                        </div>
                        <p>{item.label}</p>
                    </li>
                ))}
            </ul>
            {BUTTON_PAGINATION.map((item) => (
                <div
                    key={`${item.image.alt}`}
                    className={cx(styles.button, styles[item.className])}
                >
                    <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        height={18}
                        width={18}
                    />
                </div>
            ))}
        </div>
    )
}
