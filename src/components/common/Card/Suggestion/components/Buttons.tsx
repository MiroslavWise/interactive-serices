"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import type { IResponseOffers } from "@/services/offers/types"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"
import { useUpdateMutualOffer } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Buttons = ({
    refetch,
    offer,
}: {
    offer: IResponseOffers
    refetch(): Promise<any>
}) => {
    const [loading, setLoading] = useState(false)
    const { systemTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const { dispatchUpdateMutual } = useUpdateMutualOffer((_) => ({
        dispatchUpdateMutual: _.dispatchUpdateMutual,
    }))

    function handleUpdate() {
        dispatchUpdateMutual({
            visible: true,
            data: offer!,
        })
    }

    function handleDelete() {
        if (!loading) {
            setLoading(true)
            if (offer.id) {
                serviceOffers.delete(offer.id).then((response) => {
                    console.log("delete offer!", response)
                    requestAnimationFrame(() => {
                        refetch().finally(() => setLoading(false))
                    })
                })
            }
        }
    }

    return (
        <section className={styles.containerButtons}>
            <Button
                typeButton={
                    systemTheme === "dark" ? "fill-primary" : "fill-orange"
                }
                label={
                    offer?.provider === "offer"
                        ? "Изменить предложение"
                        : offer?.provider === "request"
                        ? "Изменить запрос"
                        : "Изменить"
                }
                onClick={handleUpdate}
                prefixIcon={
                    <Image
                        src="/svg/edit-white.svg"
                        alt="edit"
                        width={16}
                        height={16}
                    />
                }
                className={cx(styles.buttonFill, styles[offer?.provider!])}
            />
            <motion.div
                className={styles.buttonTrash}
                data-open={isOpen}
                layout
                onClick={() => setIsOpen((prev) => !prev)}
                initial={{ borderRadius: 16 }}
            >
                {isOpen ? (
                    <>
                        <Button
                            label="Удалить"
                            typeButton="fill-primary"
                            suffixIcon={
                                <Image
                                    src="/svg/trash-black.svg"
                                    alt="trash"
                                    width={16}
                                    height={16}
                                />
                            }
                            onClick={handleDelete}
                            className={styles.buttonDelete}
                        />
                        <Button
                            label="Отмена"
                            typeButton="regular-primary"
                            className={styles.buttonDelete}
                        />
                    </>
                ) : (
                    <Image
                        src="/svg/trash-black.svg"
                        alt="trash"
                        width={16}
                        height={16}
                    />
                )}
            </motion.div>
        </section>
    )
}
