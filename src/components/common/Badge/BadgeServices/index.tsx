"use client"

import { useEffect, useMemo, useState } from "react"

import type { TBadgeServices } from "./types"

import { useBalloonCard, useOffersCategories } from "@/store/hooks"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
    const [src, setSrc] = useState(`/svg/category/default.svg`)
    const { id, provider, categoryId, userId, addresses, isClickable } = props
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const infoCategory = useMemo(() => {
        if (!categories.length || !categoryId) {
            return null
        }

        return categories?.find((_) => _?.id === categoryId)
    }, [categories, categoryId])

    useEffect(() => {
        if (!!categories.length || !!categoryId) {
            const id = categories?.find((_) => _?.id === categoryId)?.id!
            setSrc(`/svg/category/${id}.svg`)
        }
    }, [categories, categoryId])

    function handle() {
        if (addresses && id && isClickable) {
            dispatch({
                visible: true,
                type: provider!,
                id: id,
                idUser: userId,
            })
        }
    }

    return (
        <li className={styles.container} data-type={provider} onClick={handle}>
            <div data-img>
                <img
                    src={src}
                    alt="cat"
                    onError={(err) => {
                        console.log("err data-img: ", err)
                        setSrc(`/svg/category/default.svg`)
                    }}
                    height={24}
                    width={24}
                />
            </div>
            <p>{infoCategory?.title! || "---{}---"}</p>
        </li>
    )
}
