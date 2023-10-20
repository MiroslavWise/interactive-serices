"use client"

import { isMobile } from "react-device-detect"
import { forwardRef, memo, useMemo } from "react"

import type { TListOffersBarter } from "./types"

import { ImageStatic } from "@/components/common/Image"

import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./style.module.scss"

const $ListOffersBarter = forwardRef(function ListOffersBarter(
    props: TListOffersBarter,
) {
    const { items, active, onClick, ...rest } = props ?? {}
    const { categories } = useOffersCategories()

    const height = useMemo(() => {
        const length = items?.length || 70 + 32

        return 16 + length * 70 + (length - 1) * 8
    }, [items])

    return (
        <article className={styles.container} {...rest} data-mobile={isMobile}>
            <ul style={{ height: height }}>
                {items?.map((item) => (
                    <li
                        key={`${item.id}-my-offer`}
                        data-provider={item.provider}
                        data-active={active === item.id}
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            onClick(item.id)
                        }}
                    >
                        <ImageStatic
                            src="/map/circle-offers-default.png"
                            alt="offer"
                            width={58}
                            height={58}
                        />
                        <h3>
                            {
                                categories?.find(
                                    (item_) =>
                                        Number(item_.id) ===
                                        Number(item?.categoryId),
                                )?.title
                            }
                        </h3>
                    </li>
                ))}
            </ul>
            {length ? <sup></sup> : null}
        </article>
    )
})

export const ListOffersBarter = memo($ListOffersBarter)
