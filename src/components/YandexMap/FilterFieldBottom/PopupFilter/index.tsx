"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"

import type { TPopupFilter } from "./types"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { SearchInput } from "@/components/common"

import { cx } from "@/lib/cx"
import { IconCategory } from "@/lib/icon-set"
import { BUTTON_PAGINATION } from "./constants"
import { useFilterMap, dispatchFilterMap, useOffersCategories } from "@/store"

import styles from "./styles/style.module.scss"

export const PopupFilter: TPopupFilter = ({ visible }) => {
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
    const categories = useOffersCategories(({ categories }) => categories)
    const [value, setValue] = useState("")
    const refImages = useRef<HTMLUListElement>(null)

    const categoriesMain: IResponseOffersCategories[] = useMemo(() => {
        const array = Array.from(new Set(categories?.filter((item) => item?.title?.toLowerCase().includes(value?.toLowerCase())).map((item) => item.provider)))
        const arrayMain = categories
            ?.filter((item) => item.provider === "main")
            ?.filter((item) => array.some((_) => _.includes(item.slug)) || item.title?.toLowerCase()?.includes(value?.toLowerCase()))

        return [...arrayMain]
    }, [categories, value])

    function to(value: boolean) {
        if (refImages.current) {
            if (value) {
                refImages.current.scrollBy({
                    top: 0,
                    left: -75,
                    behavior: "smooth",
                })
            } else {
                refImages.current.scrollBy({
                    top: 0,
                    left: +75,
                    behavior: "smooth",
                })
            }
        }
    }

    return (
        <div
            className={styles.popupFilter}
            data-visible={visible}
            onWheel={(event) => {
                event.stopPropagation()
                if (refImages.current) {
                    refImages.current.scrollBy({
                        top: 0,
                        left: event.deltaY,
                        behavior: "smooth",
                    })
                }
            }}
        >
            <SearchInput value={value} setValue={setValue} placeholder="Что именно вы хотите найти?" classNames={[styles.inputSearch]} />
            <ul ref={refImages}>
                {categoriesMain.map((item) => (
                    <li
                        key={`${item.id}-filters`}
                        onClick={(event) => {
                            event.stopPropagation()
                            dispatchFilterMap(item.id)
                        }}
                        data-active={idsNumber.includes(item.id)}
                    >
                        <img
                            data-icon
                            src={IconCategory(item.id)}
                            alt="category"
                            width={28}
                            height={28}
                            onError={(error: any) => {
                                if (error?.target) {
                                    try {
                                        error.target.src = `/svg/category/default.svg`
                                    } catch (e) {
                                        console.log("catch e: ", e)
                                    }
                                }
                            }}
                        />
                        <p>{item.title}</p>
                    </li>
                ))}
            </ul>
            {BUTTON_PAGINATION.map((item) => (
                <button
                    key={`${item.image.alt}`}
                    className={cx(styles.button, styles[item.className])}
                    onClick={(event) => {
                        event.stopPropagation()
                        if (item.className === "prev") {
                            to(true)
                        } else if (item.className === "next") {
                            to(false)
                        }
                    }}
                >
                    <img src={item.image.src} alt={item.image.alt} height={16} width={16} />
                </button>
            ))}
        </div>
    )
}
