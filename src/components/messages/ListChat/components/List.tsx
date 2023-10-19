"use client"

import { isMobile } from "react-device-detect"
import { memo, useEffect, useMemo } from "react"

import type { IFiltersItems, TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { MotionUL } from "@/components/common/Motion"

import styles from "./styles/style.module.scss"

const $List: TList = ({ items, search, setTotal }) => {
    const filters: IFiltersItems[] = useMemo(() => {
        return (
            items?.filter(
                (item) =>
                    `${item?.people?.profile?.firstName} ${item?.people?.profile?.lastName}`
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()),
            ) || []
        )
    }, [items, search])

    useEffect(() => {
        setTotal(filters?.length || 0)
    }, [filters, setTotal])

    return (
        <MotionUL
            classNames={[
                isMobile ? styles.containerListMobile : styles.containerList,
            ]}
        >
            {filters?.map((item, index) => (
                <ItemListChat
                    key={`${item?.thread?.id}-${index}-item-chat`}
                    {...item}
                    last={index < filters.length - 1}
                />
            ))}
        </MotionUL>
    )
}

export const List = memo($List)
