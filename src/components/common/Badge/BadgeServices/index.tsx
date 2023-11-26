"use client"

import { useMemo } from "react"

import type { TBadgeServices } from "./types"

import { useBalloonCard, useOffersCategories } from "@/store/hooks"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
    const { id, provider, categoryId, userId, addresses, isClickable } = props
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const infoCategory = useMemo(() => {
        if (!categories.length || !categoryId) {
            return null
        }

        return categories?.find((_) => _?.id === categoryId)
    }, [categories, categoryId])

    function handle() {
        if (addresses && id && isClickable) {
            // dispatchMapCoordinates({
            //     coordinates: addresses?.[0]?.coordinates
            //         ?.split(" ")
            //         ?.reverse()
            //         ?.map(Number),
            //     zoom: 20,
            // })
            dispatch({
                visible: true,
                type: provider!,
                id: id,
                idUser: userId,
            })
            // requestAnimationFrame(() => {
            //     handlePush("/")
            // })
        }
    }

    return (
        <li className={styles.container} data-type={provider} onClick={handle}>
            <div
                data-img
                style={{
                    backgroundImage: `url(/svg/category/${categoryId}.svg)`,
                }}
            />
            <p>{infoCategory?.title! || "---{}---"}</p>
        </li>
    )
}
