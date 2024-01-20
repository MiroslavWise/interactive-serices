"use client"

import { isMobile } from "react-device-detect"
import { forwardRef, useMemo } from "react"

import type { TListOffersBarter } from "./types"

import { ButtonDefault } from "../Buttons"

import { useOffersCategories, useAddCreateModal } from "@/store/hooks"

import styles from "./style.module.scss"

export const ListOffersBarter = forwardRef(function ListOffersBarter(
    props: TListOffersBarter,
) {
    const { items, active, onClick, ...rest } = props ?? {}
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
        ({ dispatchVisibleTypeCreateOptionals }) =>
            dispatchVisibleTypeCreateOptionals,
    )

    const height = useMemo(() => {
        const length = items?.length || 70 + 32

        return 16 + length * 70 + (length - 1) * 8
    }, [items])

    function updateProfileOffers() {
        dispatchVisibleTypeCreateOptionals({
            visible: true,
            type: "offer",
        })
    }

    return (
        <article className={styles.container} data-mobile={isMobile} {...rest}>
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
                        <div
                            data-image
                            style={{
                                backgroundImage: `url(/svg/category/${item.categoryId}.svg)`,
                            }}
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
            <ButtonDefault
                handleClick={updateProfileOffers}
                submit="button"
                label="Добавить предложение"
            />
        </article>
    )
})
