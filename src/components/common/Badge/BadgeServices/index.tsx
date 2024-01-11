"use client"

import { SyntheticEvent } from "react"

import type { TBadgeServices } from "./types"

import { useBalloonCard, useOffersCategories } from "@/store/hooks"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
    const { categoryId, provider, id, userId, addresses } = props ?? {}
    const { isClickable } = props
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const infoCategory = categories?.find((item) => item?.id === categoryId)

    function handle() {
        if (addresses?.length && id && isClickable) {
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
                    src={`/svg/category/${categoryId}.svg`}
                    alt="cat"
                    onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                        if (error?.target) {
                            try {
                                //@ts-ignore
                                error.target.src = `/svg/category/default.svg`
                            } catch (e) {
                                console.log("catch e: ", e)
                            }
                        }
                    }}
                    height={16}
                    width={16}
                />
            </div>
            <p>{infoCategory?.title! || "---{}---"}</p>
        </li>
    )
}
