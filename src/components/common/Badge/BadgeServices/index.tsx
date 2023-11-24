"use client"

import { useMemo } from "react"

import type { TBadgeServices } from "./types"

import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import {
    useBalloonCard,
    useOffersCategories,
    useMapCoordinates,
} from "@/store/hooks"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
    const { id, provider, categoryId, userId, addresses, isClickable } = props
    // const { handlePush } = usePush()
    const { categories } = useOffersCategories((_) => ({
        categories: _.categories,
    }))
    // const { dispatchMapCoordinates } = useMapCoordinates()
    const { dispatch } = useBalloonCard((_) => ({ dispatch: _.dispatch }))

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
        <li
            className={cx(styles.container)}
            data-type={provider}
            onClick={handle}
        >
            <div className={styles.containerImgService}>
                <ImageStatic
                    src={"/mocks/Nail.png"}
                    alt="mocks"
                    width={16}
                    height={16}
                />
            </div>
            <p>{infoCategory?.title! || "---{}---"}</p>
        </li>
    )
}
