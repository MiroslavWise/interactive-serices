"use client"

import { isMobile } from "react-device-detect"
import { memo, useEffect, useState } from "react"

import type { IFiltersItems, TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"

import styles from "./styles/style.module.scss"

export const List: TList = memo(function List({ items, search, setTotal }) {
    const [state, setState] = useState<IFiltersItems[]>([])

    useEffect(() => {
        if (items.length) {
            const filters =
                items?.filter((item) =>
                    `${item?.people?.profile?.firstName} ${item?.people?.profile?.lastName}`
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()),
                ) || []
            setState(filters)
        }
    }, [search, items, setTotal])

    return (
        <ul className={isMobile ? styles.containerListMobile : styles.containerList}>
            {state?.map((item, index) => (
                <ItemListChat key={`${item?.thread?.id}-${index}-item-chat`} {...item} last={index < state.length - 1} />
            ))}
        </ul>
    )
})
